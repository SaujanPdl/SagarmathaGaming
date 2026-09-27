import { Prisma, ProductCategory, DeliveryType } from '@prisma/client'
import { prisma } from '../lib/prisma.js'
import { AppError } from '../utils/errors.js'

export async function listProducts(query: { category?: string; search?: string; active?: boolean }) {
  return prisma.product.findMany({
    where: {
      ...(query.active === undefined || query.active ? { isActive: true } : {}),
      ...(query.category ? { category: query.category as ProductCategory } : {}),
      ...(query.search ? { name: { contains: query.search, mode: 'insensitive' } } : {}),
    }, orderBy: { createdAt: 'desc' },
  })
}

export async function createProduct(input: { name: string; slug: string; description?: string; category: ProductCategory; price: number; imageUrl?: string; deliveryType: DeliveryType; isActive?: boolean }) {
  return prisma.product.create({ data: { ...input, price: new Prisma.Decimal(input.price) } })
}

export async function updateProduct(id: string, input: Partial<Parameters<typeof createProduct>[0]>) {
  const product = await prisma.product.findUnique({ where: { id } })
  if (!product) throw new AppError('NOT_FOUND', 'Product not found', 404)
  return prisma.product.update({ where: { id }, data: { ...input, ...(input.price === undefined ? {} : { price: new Prisma.Decimal(input.price) }) } })
}

export async function getProduct(id: string) {
  const product = await prisma.product.findFirst({ where: { id, isActive: true } })
  if (!product) throw new AppError('NOT_FOUND', 'Product not found', 404)
  return product
}