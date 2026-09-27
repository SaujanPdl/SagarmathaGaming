import { Router } from 'express'
import { z } from 'zod'
import { requireAdmin, requireAuth, type AuthenticatedRequest } from '../middleware/auth.middleware.js'
import { prisma } from '../lib/prisma.js'
import { AppError } from '../utils/errors.js'
import { success } from '../utils/response.js'
import { createPaymentProofUrl } from '../services/storage.service.js'
import { createProduct, listProducts, updateProduct } from '../services/product.service.js'

const router = Router()
router.use(requireAuth, requireAdmin)

router.get('/orders', async (request, response) => success(response, await prisma.order.findMany({ where: { ...(typeof request.query.status === 'string' ? { status: request.query.status as never } : {}), ...(typeof request.query.paymentStatus === 'string' ? { paymentStatus: request.query.paymentStatus as never } : {}) }, include: { items: true, payments: true, delivery: true }, orderBy: { createdAt: 'desc' } })))
router.get('/orders/:orderNumber', async (request, response) => {
  const order = await prisma.order.findUnique({ where: { orderNumber: String(request.params.orderNumber) }, include: { items: true, payments: true, delivery: true } })
  if (!order) throw new AppError('NOT_FOUND', 'Order not found', 404)
  return success(response, { ...order, payments: await Promise.all(order.payments.map(withProofUrls)) })
})
router.get('/payments', async (_request, response) => {
  const payments = await prisma.payment.findMany({ include: { order: { select: { orderNumber: true, customerName: true, customerEmail: true } } }, orderBy: { createdAt: 'desc' } })
  return success(response, await Promise.all(payments.map(withProofUrls)))
})
router.patch('/orders/:orderNumber/status', async (request, response) => {
  const { status } = z.object({ status: z.enum(['PENDING', 'PAYMENT_REVIEW', 'PAID', 'PROCESSING', 'COMPLETED', 'CANCELLED']) }).parse(request.body)
  return success(response, await prisma.order.update({ where: { orderNumber: String(request.params.orderNumber) }, data: { status } }))
})
router.patch('/payments/:id/verify', async (request: AuthenticatedRequest, response) => success(response, await prisma.$transaction(async transaction => {
  const existing = await transaction.payment.findUnique({ where: { id: String(request.params.id) } })
  if (!existing || existing.status !== 'PENDING') throw new AppError('PAYMENT_LOCKED', 'Only pending payments can be verified', 409)
  const payment = await transaction.payment.update({ where: { id: String(request.params.id) }, data: { status: 'VERIFIED', verifiedAt: new Date(), verifiedBy: request.user!.id } })
  await transaction.order.update({ where: { id: payment.orderId }, data: { paymentStatus: 'VERIFIED', status: 'PROCESSING' } })
  return payment
})))
router.patch('/payments/:id/reject', async (request: AuthenticatedRequest, response) => success(response, await prisma.$transaction(async transaction => {
  const existing = await transaction.payment.findUnique({ where: { id: String(request.params.id) } })
  if (!existing || existing.status !== 'PENDING') throw new AppError('PAYMENT_LOCKED', 'Only pending payments can be rejected', 409)
  const payment = await transaction.payment.update({ where: { id: String(request.params.id) }, data: { status: 'REJECTED', verifiedAt: new Date(), verifiedBy: request.user!.id } })
  await transaction.order.update({ where: { id: payment.orderId }, data: { paymentStatus: 'REJECTED' } })
  return payment
})))
router.post('/orders/:orderNumber/delivery', async (request: AuthenticatedRequest, response) => {
  const input = z.object({ deliveryType: z.enum(['MANUAL', 'DIGITAL_CODE', 'TOP_UP']), code: z.string().max(500).optional(), message: z.string().max(2000).optional() }).parse(request.body)
  const order = await prisma.order.findUnique({ where: { orderNumber: String(request.params.orderNumber) } })
  if (!order) throw new AppError('NOT_FOUND', 'Order not found', 404)
  const delivery = await prisma.$transaction(async transaction => {
    const result = await transaction.delivery.upsert({ where: { orderId: order.id }, update: { ...input, deliveredAt: new Date(), deliveredBy: request.user!.id }, create: { orderId: order.id, ...input, deliveredAt: new Date(), deliveredBy: request.user!.id } })
    await transaction.order.update({ where: { id: order.id }, data: { status: 'COMPLETED' } })
    return result
  })
  return success(response, delivery)
})
router.patch('/orders/:orderNumber/delivery', async (request: AuthenticatedRequest, response) => {
  const input = z.object({ deliveryType: z.enum(['MANUAL', 'DIGITAL_CODE', 'TOP_UP']), code: z.string().max(500).optional(), message: z.string().max(2000).optional() }).parse(request.body)
  const order = await prisma.order.findUnique({ where: { orderNumber: String(request.params.orderNumber) } })
  if (!order) throw new AppError('NOT_FOUND', 'Order not found', 404)
  return success(response, await prisma.delivery.update({ where: { orderId: order.id }, data: { ...input, deliveredAt: new Date(), deliveredBy: request.user!.id } }))
})
router.get('/products', async (_request, response) => success(response, await listProducts({ active: false })))
router.post('/products', async (request, response) => success(response, await createProduct(productSchema.parse(request.body)), 201))
router.patch('/products/:id', async (request, response) => success(response, await updateProduct(String(request.params.id), productSchema.partial().parse(request.body))))
router.delete('/products/:id', async (request, response) => success(response, await updateProduct(String(request.params.id), { isActive: false })))

const productSchema = z.object({ name: z.string().min(2), slug: z.string().min(2), description: z.string().optional(), category: z.enum(['GAME', 'GIFT_CARD', 'TOP_UP', 'SUBSCRIPTION']), price: z.number().nonnegative(), imageUrl: z.string().url().optional(), deliveryType: z.enum(['MANUAL', 'DIGITAL_CODE', 'TOP_UP']), isActive: z.boolean().optional() })

async function withProofUrls<T extends { proofUrl: string | null }>(payment: T) {
  return payment.proofUrl ? { ...payment, proofUrl: await createPaymentProofUrl(payment.proofUrl) } : payment
}

export default router