import multer from 'multer'
import { env } from '../config/env.js'

export const paymentProofUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: env.PAYMENT_PROOF_MAX_BYTES, files: 1 },
})