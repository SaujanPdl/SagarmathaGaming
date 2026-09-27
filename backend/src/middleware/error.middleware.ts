import type { ErrorRequestHandler } from 'express'
import { ZodError } from 'zod'
import multer from 'multer'
import { AppError } from '../utils/errors.js'
import { failure } from '../utils/response.js'

export const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  if (error instanceof ZodError) {
    return failure(response, 'VALIDATION_ERROR', 'Invalid request', 422)
  }
  if (error instanceof multer.MulterError) {
    return failure(response, error.code === 'LIMIT_FILE_SIZE' ? 'FILE_TOO_LARGE' : 'UPLOAD_ERROR', 'Invalid payment proof upload', 422)
  }
  if (error instanceof AppError) {
    return failure(response, error.code, error.message, error.status)
  }
  console.error(error)
  return failure(response, 'INTERNAL_ERROR', 'An unexpected error occurred', 500)
}