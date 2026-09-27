import { Prisma } from '@prisma/client'
import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'
import { prisma } from '../lib/prisma.js'
import { AppError } from '../utils/errors.js'

type OrderInput = {
  items: Array<{ productId: string; quantity: number; playerId?: string; server?: string }>
  customer: { name: string; email: string; phone: string }
  userId?: string
}

export async function createOrder(input: OrderInput) {
  const productIds = input.items.map(item => item.productId)
  const products = await prisma.product.findMany({ where: { id: { in: productIds }, isActive: true } })
  if (products.length !== new Set(productIds).size) throw new AppError('INVALID_PRODUCT', 'One or more products are unavailable', 422)
  const productMap = new Map(products.map(product => [product.id, product]))
  const orderItems = input.items.map(item => {
    const product = productMap.get(item.productId)
    if (!product || !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 99) throw new AppError('INVALID_ITEM', 'Invalid order item', 422)
    const subtotal = product.price.mul(item.quantity)
    return { productId: product.id, productName: product.name, quantity: item.quantity, unitPrice: product.price, subtotal, playerId: item.playerId, server: item.server }
  })
  const totalAmount = orderItems.reduce((total, item) => total.add(item.subtotal), new Prisma.Decimal(0))
  const orderNumber = `SG-${10001 + await prisma.order.count()}`
  const order = await prisma.$transaction(async transaction => transaction.order.create({
    data: { orderNumber, userId: input.userId, customerName: input.customer.name, customerEmail: input.customer.email, customerPhone: input.customer.phone, totalAmount, items: { create: orderItems } },
    include: { items: true },
  }))
  return input.userId ? order : { ...order, accessToken: jwt.sign({ sub: order.id, type: 'guest-order' }, env.JWT_SECRET, { expiresIn: '24h' }) }
}

export function verifyGuestOrderToken(token: string, orderId: string) {
  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as { sub?: string; type?: string }
    return payload.type === 'guest-order' && payload.sub === orderId
  } catch {
    return false
  }
}

export function publicOrder(order: { orderNumber: string; customerName: string; customerEmail: string; totalAmount: unknown; status: string; paymentStatus: string; items: unknown; createdAt: Date }) {
  return order
}