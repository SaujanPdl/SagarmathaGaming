import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import { env } from './config/env.js'
import { errorHandler } from './middleware/error.middleware.js'
import { failure, success } from './utils/response.js'
import authRoutes from './routes/auth.routes.js'
import orderRoutes from './routes/order.routes.js'
import productRoutes from './routes/product.routes.js'
import paymentRoutes from './routes/payment.routes.js'
import adminRoutes from './routes/admin.routes.js'
import playerIdRoutes from './routes/player-id.routes.js'

export const app = express()

app.use(helmet())
app.use(cors({ origin: env.FRONTEND_URL, credentials: true }))
app.use(express.json({ limit: '1mb' }))
app.use(cookieParser())
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 300 }))

app.get('/api/health', async (_request, response) => success(response, { status: 'ok' }))
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api', paymentRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/player-ids', playerIdRoutes)
app.use((_request, response) => failure(response, 'NOT_FOUND', 'Route not found', 404))
app.use(errorHandler)