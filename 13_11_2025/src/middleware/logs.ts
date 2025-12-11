import express from 'express'
import MongoService from '../mongo'
import createLog from '../utils/create-log'

const logsMiddleware = express.Router()

logsMiddleware.use((req, res, next) => {
  const db = MongoService.getDb()
  if (!db) {
    console.error('no mongodb connection')
    next()
    return
  }

  const accessLogs = db.collection('accessLogs')
  const log = createLog(req, res)
  accessLogs.insertOne(log)
  next()
})

export { logsMiddleware }
