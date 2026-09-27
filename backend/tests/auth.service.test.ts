import { beforeEach, describe, expect, it, vi } from 'vitest'
import argon2 from 'argon2'

const findUnique = vi.fn()
const create = vi.fn()
vi.mock('../src/lib/prisma.js', () => ({ prisma: { user: { findUnique, create } } }))

const { loginUser, registerUser } = await import('../src/services/auth.service.js')

describe('authentication service', () => {
  beforeEach(() => vi.clearAllMocks())

  it('rejects duplicate registration', async () => {
    findUnique.mockResolvedValue({ id: 'existing' })
    await expect(registerUser({ name: 'Customer', email: 'customer@example.com', password: 'password123' })).rejects.toMatchObject({ code: 'EMAIL_EXISTS', status: 409 })
  })

  it('rejects an invalid password', async () => {
    findUnique.mockResolvedValue({ email: 'customer@example.com', passwordHash: await argon2.hash('correct-password') })
    await expect(loginUser('customer@example.com', 'wrong-password')).rejects.toMatchObject({ code: 'INVALID_CREDENTIALS', status: 401 })
  })

  it('hashes a new customer password before creating the user', async () => {
    findUnique.mockResolvedValue(null)
    create.mockResolvedValue({ id: 'new', name: 'Customer', email: 'customer@example.com', phone: null, role: 'CUSTOMER' })
    await registerUser({ name: 'Customer', email: 'customer@example.com', password: 'password123' })
    expect(create).toHaveBeenCalledWith(expect.objectContaining({ data: expect.objectContaining({ passwordHash: expect.stringContaining('$argon2') }) }))
  })
})