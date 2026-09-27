import { Router } from 'express'
import { z } from 'zod'
import { optionalAuth, requireAuth, type AuthenticatedRequest } from '../middleware/auth.middleware.js'
import { prisma } from '../lib/prisma.js'
import { createOrder } from '../services/order.service.js'
import { AppError } from '../utils/errors.js'
import { success } from '../utils/response.js'

const router = Router()
const orderSchema = z.object({
  items: z.array(z.object({ productId: z.string().min(1), quantity: z.number().int().min(1).max(99), playerId: z.string().max(100).optional(), server: z.string().max(100).optional() })).min(1),
  customer: z.object({ name: z.string().min(2).max(100), email: z.string().email(), phone: z.string().min(5).max(30) }),
})

router.post('/', optionalAuth, async (request: AuthenticatedRequest, response) => success(response, await createOrder({ ...orderSchema.parse(request.body), userId: request.user?.id }), 201))

router.get('/my-orders', requireAuth, async (request: AuthenticatedRequest, response) => {
  const orders = await prisma.order.findMany({ where: { userId: request.user!.id }, include: { items: true, delivery: true }, orderBy: { createdAt: 'desc' } })
  return success(response, orders)
})

router.get('/:orderNumber', requireAuth, async (request: AuthenticatedRequest, response) => {
  const order = await prisma.order.findFirst({ where: { orderNumber: String(request.params.orderNumber), userId: request.user!.id }, include: { items: true, delivery: true, payments: true } })
  if (!order) throw new AppError('NOT_FOUND', 'Order not found', 404)
  return success(response, order)
})

export default router