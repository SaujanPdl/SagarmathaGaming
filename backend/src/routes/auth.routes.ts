import { Router } from 'express'
import { z } from 'zod'
import { requireAuth, type AuthenticatedRequest } from '../middleware/auth.middleware.js'
import { loginUser, registerUser } from '../services/auth.service.js'
import { success } from '../utils/response.js'

const router = Router()
const credentials = z.object({ email: z.string().email(), password: z.string().min(8) })
const registration = credentials.extend({ name: z.string().min(2).max(100), phone: z.string().max(30).optional() })
const cookieOptions = { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax' as const, maxAge: 7 * 24 * 60 * 60 * 1000 }

router.post('/register', async (request, response) => {
  const user = await registerUser(registration.parse(request.body))
  return success(response, user, 201)
})

router.post('/login', async (request, response) => {
  const result = await loginUser(...Object.values(credentials.parse(request.body)) as [string, string])
  response.cookie('sg_session', result.token, cookieOptions)
  return success(response, result.user)
})

router.post('/logout', (_request, response) => {
  response.clearCookie('sg_session', cookieOptions)
  return success(response, { loggedOut: true })
})

router.get('/me', requireAuth, (request: AuthenticatedRequest, response) => success(response, request.user))

export default router