import express, { Express } from 'express'
import postController from './controller/post.controller'
import userController from './controller/user.controller'
import categoryController from './controller/category.controller'
import commentController from './controller/comment.controller'
import MongoService from './mongo'
import { logsMiddleware } from './middleware/logs'
import { errorMiddleware } from './middleware/error'

const app: Express = express()

MongoService.connect();

app.use(express.json())
app.use(logsMiddleware);
app.use(errorMiddleware);
app.use('/post', postController)
app.use('/user', userController)
app.use('/category', categoryController)
app.use('/comment', commentController)

async function run() {
  app.listen(3000, () => {
    console.log('App is running on http://localhost:3000')
  })
}

run().finally(()=>{
  MongoService.disconnect();
})
