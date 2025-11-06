import connectToDatabase from './database'
import express from 'express'
import { writeError } from './utils'

const router = express()

export default async function getApiRouter() {
  const db = await connectToDatabase()
  router.get('/api/contact-messages', async (req, res) => {
    try {
      const [results] = await db.query('SELECT * FROM messages')
      res.json(results)
    } catch (err) {
      writeError(res, 500, err)
    }
  })

  return router
}
