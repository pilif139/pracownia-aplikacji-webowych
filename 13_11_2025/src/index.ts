import express, { Express } from 'express'
import postController from './controller/post.controller'
import userController from './controller/user.controller'
import categoryController from './controller/category.controller'
import commentController from './controller/comment.controller'
import MongoService from './mongo'
import { logsMiddleware } from './middleware/logs'
import { errorMiddleware } from './middleware/error'
import dotenv from 'dotenv'

dotenv.config()

const app: Express = express()

app.use(express.json())
app.use(logsMiddleware)
app.use('/post', postController)
app.use('/user', userController)
app.use('/category', categoryController)
app.use('/comment', commentController)

app.use(errorMiddleware)

async function run() {
  try {
    await MongoService.connect()

    app.listen(3000, () => {
      console.log('App is running on http://localhost:3000')
    })
  } catch (error) {
    console.error('Failed to start application:', error)
    process.exit(1)
  }
}

run()

process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...')
  await MongoService.disconnect()
  process.exit(0)
})

process.on('SIGTERM', async () => {
  console.log('Shutting down gracefully...')
  await MongoService.disconnect()
  process.exit(0)
})
