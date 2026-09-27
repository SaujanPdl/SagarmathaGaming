import argon2 from 'argon2'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { PrismaClient, ProductCategory, DeliveryType, UserRole } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD
  if (!email || !password) throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD are required')

  await prisma.user.upsert({
    where: { email },
    update: { role: UserRole.ADMIN, passwordHash: await argon2.hash(password) },
    create: { name: 'Sagarmatha Admin', email, passwordHash: await argon2.hash(password), role: UserRole.ADMIN },
  })

  const dataPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../src/data/products_clean.json')
  const sourceProducts = JSON.parse(fs.readFileSync(dataPath, 'utf8')) as Array<{ sku?: string; name?: string; price?: number; category?: string; deliveryType?: string; image?: string; status?: string }>
  const products = sourceProducts
    .filter((product) => product.name && Number(product.price) >= 0)
    .map((product) => {
      const category = product.category === 'Game Top-Up' ? ProductCategory.TOP_UP : product.category === 'Gift Cards' ? ProductCategory.GIFT_CARD : product.category === 'AI & Subscription' ? ProductCategory.SUBSCRIPTION : ProductCategory.GAME
      const deliveryType = category === ProductCategory.TOP_UP ? DeliveryType.TOP_UP : product.deliveryType?.toLowerCase().includes('code') ? DeliveryType.DIGITAL_CODE : DeliveryType.MANUAL
      return { name: product.name!, slug: product.sku || product.name!.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''), category, deliveryType, price: Number(product.price), imageUrl: product.image, description: product.deliveryType, isActive: product.status !== 'Sold Out' }
    })
  for (const product of products) {
    await prisma.product.upsert({ where: { slug: product.slug }, update: product, create: product })
  }
}

main().finally(() => prisma.$disconnect())