import { createClient } from '@supabase/supabase-js'
import { fileTypeFromBuffer } from 'file-type'
import { env } from '../config/env.js'
import { AppError } from '../utils/errors.js'

const allowedTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'application/pdf'])

function getClient() {
  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) throw new AppError('STORAGE_NOT_CONFIGURED', 'Payment proof storage is not configured', 503)
  return createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } })
}

export async function uploadPaymentProof(file: { buffer: Buffer; mimetype: string; size: number }, orderNumber: string) {
  if (!allowedTypes.has(file.mimetype)) throw new AppError('INVALID_FILE_TYPE', 'Only JPEG, PNG, WebP, and PDF files are allowed', 422)
  if (file.size > env.PAYMENT_PROOF_MAX_BYTES) throw new AppError('FILE_TOO_LARGE', 'Payment proof exceeds the maximum file size', 422)
  const detected = await fileTypeFromBuffer(file.buffer)
  const detectedType = detected?.mime || (file.mimetype === 'application/pdf' && file.buffer.subarray(0, 5).toString() === '%PDF-' ? 'application/pdf' : '')
  if (!allowedTypes.has(detectedType) || detectedType !== file.mimetype) throw new AppError('INVALID_FILE_TYPE', 'Payment proof content does not match its file type', 422)
  const extension = detectedType === 'application/pdf' ? 'pdf' : detectedType.split('/')[1]
  const path = `${orderNumber}/${crypto.randomUUID()}.${extension}`
  const { error } = await getClient().storage.from(env.SUPABASE_STORAGE_BUCKET).upload(path, file.buffer, { contentType: file.mimetype, upsert: false })
  if (error) throw new AppError('STORAGE_UPLOAD_FAILED', 'Could not upload payment proof', 502)
  return path
}

export async function createPaymentProofUrl(path: string) {
  const { data, error } = await getClient().storage.from(env.SUPABASE_STORAGE_BUCKET).createSignedUrl(path, 10 * 60)
  if (error || !data?.signedUrl) throw new AppError('STORAGE_READ_FAILED', 'Could not read payment proof', 502)
  return data.signedUrl
}