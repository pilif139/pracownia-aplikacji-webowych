import express, { Express } from 'express'
import postController from './controller/post.controller'
import userController from './controller/user.controller'
import categoryController from './controller/category.controller'
import commentController from './controller/comment.controller'

const app: Express = express()

app.use(express.json())
app.use('/post', postController)
app.use('/user', userController)
app.use('/category', categoryController)
app.use('/comment', commentController)

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})
