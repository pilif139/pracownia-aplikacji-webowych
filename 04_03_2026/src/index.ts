import express from 'express'
import { errorHandler, notFoundHandler } from './error.middleware'
import postRouter from './Post/post.controller'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(
  cors({
    origin: 'http://localhost:5173'
  })
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/posts', postRouter)

app.use(notFoundHandler)
app.use(errorHandler)

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})
