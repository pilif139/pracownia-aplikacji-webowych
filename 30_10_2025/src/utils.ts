import { type Response } from 'express'

export function writeError(res: Response, statusCode: number, error: unknown) {
  res.status(statusCode).json({
    error: error instanceof Error ? error.message : String(error)
  })
}
