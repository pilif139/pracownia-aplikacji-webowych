/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express'
import MongoService from '../mongo'
import createLog from '../utils/create-log'

const errorMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const db = MongoService.getDb()

  if (!db) {
    console.error('no mongodb connected')
    res.status(500).json({
      message: 'Internal Server Error',
      error: 'Database not connected'
    })
    return
  }

  const errorLogs = db.collection('errorLogs')

  const log = createLog(req, res)
  const errorLog = {
    ...log,
    error: {
      message: (err as Error).message,
      stack: (err as Error).stack,
      name: (err as Error).name
    }
  }

  errorLogs.insertOne(errorLog).catch((logErr) => {
    console.error('Failed to log error to database:', logErr)
  })

  res.status(500).json({
    message: 'Internal Server Error',
    error: (err as Error).message
  })
}

export { errorMiddleware }
