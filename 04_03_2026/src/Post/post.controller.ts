import express from 'express'
import prisma from '../prisma'
import { PostCreateInput } from '../../generated/prisma/models'

const postRouter = express.Router()

postRouter.get('/', async (req, res, next) => {
  try {
    const posts = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        body: true,
        comments: false
      }
    })
    res.json(posts)
  } catch (error) {
    next(error)
  }
})

postRouter.get('/:id', async (req, res, next) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: req.params.id },
      select: {
        id: true,
        title: true,
        body: true,
        comments: {
          select: {
            id: true,
            postId: true,
            text: true
          }
        }
      }
    })
    if (!post) {
      return res.status(404).json({ error: 'Post not found' })
    }
    res.json(post)
  } catch (error) {
    next(error)
  }
})

postRouter.post('/', async (req, res, next) => {
  try {
    const { title, body } = req.body as PostCreateInput
    const newPost = await prisma.post.create({
      data: { title, body }
    })
    res.status(201).json(newPost)
  } catch (error) {
    next(error)
  }
})

postRouter.post('/:id/comments', async (req, res, next) => {
  try {
    const { text } = req.body as { text: string }
    const postId = req.params.id
    const newComment = await prisma.comment.create({
      data: {
        text,
        post: { connect: { id: postId } }
      }
    })
    res.status(201).json(newComment)
  } catch (error) {
    next(error)
  }
})

export default postRouter
