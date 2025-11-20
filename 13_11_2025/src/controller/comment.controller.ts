import express from 'express'
import * as commentRepository from '../repository/comment.repository'
import * as userRepository from '../repository/user.repository'

const router = express.Router()

router.get('/', (req, res) => {
  const comments = commentRepository.getAllComments()
  res.json(comments)
})

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const comment = await commentRepository.getCommentById(id)
  if (comment) {
    res.json(comment)
  } else {
    res.status(404).json({ message: 'Comment not found' })
  }
})

type NewCommentRequest = {
  postId: number
  authorId: number
  content: string
}

router.post('/', async (req, res) => {
  const { postId, authorId, content } = req.body as NewCommentRequest
  const isUserValid = await userRepository.getUserById(authorId)
  if (!isUserValid) {
    return res.status(400).json({ message: 'Invalid user ID' })
  }
  try {
    const newComment = await commentRepository.createComment({
      post: { connect: { id: postId } },
      author: { connect: { id: authorId } },
      content
    })
    res.status(201).json(newComment)
  } catch (error) {
    res.status(500).json({ message: 'Error creating comment', error: error })
  }
})

router.put('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const data = req.body
  try {
    const updatedComment = await commentRepository.putComment(id, data)
    res.json(updatedComment)
  } catch (error) {
    res.status(500).json({ message: 'Error updating comment', error: error })
  }
})

router.patch('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const data = req.body
  try {
    const updatedComment = await commentRepository.patchComment(id, data)
    res.json(updatedComment)
  } catch (error) {
    res.status(500).json({ message: 'Error updating comment', error: error })
  }
})

router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const isValid = await commentRepository.getCommentById(id)
  if (!isValid) {
    return res
      .status(400)
      .json({ message: 'Bad request payload. Comment not found.' })
  }
  await commentRepository.deleteComment(id)
  res.status(204).send()
})

export default router
