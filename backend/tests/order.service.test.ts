import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Prisma } from '@prisma/client'

const findMany = vi.fn()
const count = vi.fn()
const create = vi.fn()
const transaction = vi.fn(async (callback: (client: { order: { create: typeof create } }) => unknown) => callback({ order: { create } }))

vi.mock('../src/lib/prisma.js', () => ({ prisma: { product: { findMany }, order: { count }, $transaction: transaction } }))

const { createOrder } = await import('../src/services/order.service.js')

describe('createOrder', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    count.mockResolvedValue(0)
    create.mockImplementation(async ({ data }: { data: unknown }) => ({ orderNumber: 'SG-10001', ...data }))
  })

  it('calculates server-side prices for multiple items', async () => {
    findMany.mockResolvedValue([
      { id: 'one', name: 'One', price: new Prisma.Decimal(100), isActive: true },
      { id: 'two', name: 'Two', price: new Prisma.Decimal(250), isActive: true },
    ])
    const order = await createOrder({ items: [{ productId: 'one', quantity: 2 }, { productId: 'two', quantity: 1 }], customer: { name: 'Customer', email: 'customer@example.com', phone: '9800000000' } })
    expect(order.totalAmount.toString()).toBe('450')
    expect(create).toHaveBeenCalledOnce()
  })

  it('rejects an inactive or unknown product', async () => {
    findMany.mockResolvedValue([])
    await expect(createOrder({ items: [{ productId: 'missing', quantity: 1 }], customer: { name: 'Customer', email: 'customer@example.com', phone: '9800000000' } })).rejects.toMatchObject({ code: 'INVALID_PRODUCT', status: 422 })
  })
})