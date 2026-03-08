/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express'

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = 500
  const message = err.message || 'Internal Server Error'
  console.error(`[${req.method} ${req.path}] - Error: ${message}`)
  res.status(status).json({
    error: {
      status,
      message,
      timestamp: new Date().toISOString(),
      path: req.path
    }
  })
  next()
}

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(404).json({
    error: {
      status: 404,
      message: 'Route not found',
      path: req.path
    }
  })
  next()
}
