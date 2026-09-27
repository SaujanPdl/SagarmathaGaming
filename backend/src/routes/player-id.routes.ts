import { Router } from 'express'
import { z } from 'zod'
import { requireAuth, type AuthenticatedRequest } from '../middleware/auth.middleware.js'
import { prisma } from '../lib/prisma.js'
import { success } from '../utils/response.js'

const router = Router()
const playerSchema = z.object({ game: z.string().min(1).max(100), playerId: z.string().min(1).max(100), nickname: z.string().max(100).optional(), server: z.string().max(100).optional() })
router.use(requireAuth)
router.get('/', async (request: AuthenticatedRequest, response) => success(response, await prisma.savedPlayerId.findMany({ where: { userId: request.user!.id }, orderBy: { updatedAt: 'desc' } })))
router.post('/', async (request: AuthenticatedRequest, response) => success(response, await prisma.savedPlayerId.create({ data: { ...playerSchema.parse(request.body), userId: request.user!.id } }), 201))
router.patch('/:id', async (request: AuthenticatedRequest, response) => success(response, await prisma.savedPlayerId.updateMany({ where: { id: String(request.params.id), userId: request.user!.id }, data: playerSchema.partial().parse(request.body) })))
router.delete('/:id', async (request: AuthenticatedRequest, response) => success(response, await prisma.savedPlayerId.deleteMany({ where: { id: String(request.params.id), userId: request.user!.id } })))
export default router