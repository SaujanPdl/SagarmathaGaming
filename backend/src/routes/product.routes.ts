import { Router } from 'express'
import { z } from 'zod'
import { requireAdmin, requireAuth } from '../middleware/auth.middleware.js'
import { createProduct, getProduct, listProducts, updateProduct } from '../services/product.service.js'
import { success } from '../utils/response.js'

const router = Router()
const productSchema = z.object({ name: z.string().min(2), slug: z.string().min(2), description: z.string().optional(), category: z.enum(['GAME', 'GIFT_CARD', 'TOP_UP', 'SUBSCRIPTION']), price: z.number().nonnegative(), imageUrl: z.string().url().optional(), deliveryType: z.enum(['MANUAL', 'DIGITAL_CODE', 'TOP_UP']), isActive: z.boolean().optional() })

router.get('/', async (request, response) => success(response, await listProducts({ category: typeof request.query.category === 'string' ? request.query.category : undefined, search: typeof request.query.search === 'string' ? request.query.search : undefined })))
router.get('/:id', async (request, response) => success(response, await getProduct(String(request.params.id))))
router.post('/', requireAuth, requireAdmin, async (request, response) => success(response, await createProduct(productSchema.parse(request.body)), 201))
router.patch('/:id', requireAuth, requireAdmin, async (request, response) => success(response, await updateProduct(String(request.params.id), productSchema.partial().parse(request.body))))
router.delete('/:id', requireAuth, requireAdmin, async (request, response) => success(response, await updateProduct(String(request.params.id), { isActive: false })))

export default router