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

  router.get('/api/contact-messages/:id', async (req, res) => {
    const id = req.params.id
    try {
      const [results] = await db.query('SELECT * FROM messages WHERE id = ?', [
        id
      ])
      if (Array.isArray(results) && results.length > 0) {
        res.json(results[0])
      } else {
        writeError(res, 404, 'Message not found')
      }
    } catch (err) {
      writeError(res, 500, err)
    }
  })

  return router
}
