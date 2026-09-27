import { describe, expect, it, vi } from 'vitest'
import { requireAdmin } from '../src/middleware/auth.middleware.js'

describe('admin authorization', () => {
  it('rejects customers', () => {
    const next = vi.fn()
    requireAdmin({ user: { id: 'customer', role: 'CUSTOMER' } } as never, {} as never, next)
    expect(next).toHaveBeenCalledWith(expect.objectContaining({ code: 'FORBIDDEN', status: 403 }))
  })

  it('allows admins', () => {
    const next = vi.fn()
    requireAdmin({ user: { id: 'admin', role: 'ADMIN' } } as never, {} as never, next)
    expect(next).toHaveBeenCalledWith()
  })
})