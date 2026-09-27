import { Router } from 'express'
import { z } from 'zod'
import { optionalAuth, type AuthenticatedRequest } from '../middleware/auth.middleware.js'
import { prisma } from '../lib/prisma.js'
import { AppError } from '../utils/errors.js'
import { success } from '../utils/response.js'
import { verifyGuestOrderToken } from '../services/order.service.js'
import { paymentProofUpload } from '../middleware/upload.middleware.js'
import { uploadPaymentProof } from '../services/storage.service.js'

const router = Router()
const paymentSchema = z.object({ method: z.enum(['MANUAL', 'BANK_TRANSFER', 'KHALTI', 'ESEWA']), amount: z.coerce.number().positive(), transactionId: z.string().max(200).optional() })

router.post('/orders/:orderNumber/payment', optionalAuth, paymentProofUpload.single('proof'), async (request: AuthenticatedRequest, response) => {
  const input = paymentSchema.parse(request.body)
  const order = await prisma.order.findFirst({ where: { orderNumber: String(request.params.orderNumber), ...(request.user ? { userId: request.user.id } : {}) } })
  if (!order) throw new AppError('NOT_FOUND', 'Order not found', 404)
  if (!request.user && (!request.headers['x-order-access-token'] || !verifyGuestOrderToken(String(request.headers['x-order-access-token']), order.id))) throw new AppError('UNAUTHORIZED', 'Order access token required', 401)
  if (order.paymentStatus === 'VERIFIED' || order.paymentStatus === 'REJECTED' || order.status === 'COMPLETED') throw new AppError('PAYMENT_LOCKED', 'This order is no longer accepting payment changes', 409)
  if (Number(input.amount) !== Number(order.totalAmount)) throw new AppError('INVALID_AMOUNT', 'Payment amount does not match order total', 422)
  if (!request.file) throw new AppError('PROOF_REQUIRED', 'Payment proof is required', 422)
  const proofPath = await uploadPaymentProof(request.file, order.orderNumber)
  const payment = await prisma.$transaction(async transaction => {
    const created = await transaction.payment.create({ data: { orderId: order.id, method: input.method, amount: input.amount, transactionId: input.transactionId, proofUrl: proofPath } })
    await transaction.order.update({ where: { id: order.id }, data: { paymentStatus: 'PENDING', status: 'PAYMENT_REVIEW' } })
    return created
  })
  return success(response, payment, 201)
})

export default router