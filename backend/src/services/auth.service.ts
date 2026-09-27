import argon2 from 'argon2'
import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'
import { prisma } from '../lib/prisma.js'
import { AppError } from '../utils/errors.js'

export async function registerUser(input: { name: string; email: string; password: string; phone?: string }) {
  const email = input.email.toLowerCase()
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) throw new AppError('EMAIL_EXISTS', 'Email is already registered', 409)
  const user = await prisma.user.create({ data: { ...input, email, passwordHash: await argon2.hash(input.password) } })
  return { id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role }
}

export async function loginUser(emailInput: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email: emailInput.toLowerCase() } })
  if (!user || !(await argon2.verify(user.passwordHash, password))) {
    throw new AppError('INVALID_CREDENTIALS', 'Invalid email or password', 401)
  }
  return {
    token: jwt.sign({ sub: user.id }, env.JWT_SECRET, { expiresIn: '7d' }),
    user: { id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role },
  }
}