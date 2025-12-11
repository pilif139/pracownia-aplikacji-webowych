import express from 'express'
import * as commentRepository from '../repository/comment.repository'
import * as userRepository from '../repository/user.repository'

const router = express.Router()

router.get('/', (req, res, next) => {
  try {
    const comments = commentRepository.getAllComments()
    res.json(comments)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const comment = await commentRepository.getCommentById(id)
    if (comment) {
      res.json(comment)
    } else {
      res.status(404).json({ message: 'Comment not found' })
    }
  } catch (error) {
    next(error)
  }
})

type NewCommentRequest = {
  postId: number
  authorId: number
  content: string
}

router.post('/', async (req, res, next) => {
  try {
    const { postId, authorId, content } = req.body as NewCommentRequest
    const isUserValid = await userRepository.getUserById(authorId)
    if (!isUserValid) {
      return res.status(400).json({ message: 'Invalid user ID' })
    }
    const newComment = await commentRepository.createComment({
      post: { connect: { id: postId } },
      author: { connect: { id: authorId } },
      content
    })
    res.status(201).json(newComment)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const data = req.body

    const updatedComment = await commentRepository.putComment(id, data)
    res.json(updatedComment)
  } catch (error) {
    next(error)
  }
})

router.patch('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const data = req.body
    const updatedComment = await commentRepository.patchComment(id, data)
    res.json(updatedComment)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const isValid = await commentRepository.getCommentById(id)
    if (!isValid) {
      return res
        .status(400)
        .json({ message: 'Bad request payload. Comment not found.' })
    }
    await commentRepository.deleteComment(id)
    res.status(204).send()
  } catch (error) {
    next(error)
  }
})

export default router
