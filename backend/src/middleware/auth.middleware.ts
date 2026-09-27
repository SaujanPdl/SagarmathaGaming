import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'
import { prisma } from '../lib/prisma.js'
import { AppError } from '../utils/errors.js'

export type AuthenticatedRequest = Request & { user?: { id: string; role: 'CUSTOMER' | 'ADMIN' } }

export async function requireAuth(request: AuthenticatedRequest, _response: Response, next: NextFunction) {
  try {
    const token = request.cookies?.sg_session
    if (!token) throw new AppError('UNAUTHORIZED', 'Authentication required', 401)
    const payload = jwt.verify(token, env.JWT_SECRET) as { sub?: string }
    if (!payload.sub) throw new AppError('UNAUTHORIZED', 'Authentication required', 401)
    const user = await prisma.user.findUnique({ where: { id: payload.sub }, select: { id: true, role: true } })
    if (!user) throw new AppError('UNAUTHORIZED', 'Authentication required', 401)
    request.user = user
    next()
  } catch (error) {
    next(error instanceof AppError ? error : new AppError('UNAUTHORIZED', 'Authentication required', 401))
  }
}

export function requireAdmin(request: AuthenticatedRequest, _response: Response, next: NextFunction) {
  if (request.user?.role !== 'ADMIN') return next(new AppError('FORBIDDEN', 'Admin access required', 403))
  next()
}

export async function optionalAuth(request: AuthenticatedRequest, _response: Response, next: NextFunction) {
  if (!request.cookies?.sg_session) return next()
  return requireAuth(request, _response, next)
}