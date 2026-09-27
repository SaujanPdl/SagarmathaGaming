import type { Response } from 'express'

export function success<T>(response: Response, data: T, status = 200) {
  return response.status(status).json({ success: true, data })
}

export function failure(response: Response, code: string, message: string, status: number) {
  return response.status(status).json({ success: false, error: { code, message } })
}