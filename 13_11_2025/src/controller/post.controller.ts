import express from 'express'
import { Prisma } from '../../prisma/prisma/client'
import * as postRepository from '../repository/post.repository'
import * as categoryRepository from '../repository/category.repository'

const router = express.Router()

router.get('/', async (req, res) => {
  const posts = await postRepository.getAllPosts()
  res.json(posts)
})

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const post = await postRepository.getPostById(id)
  if (post) {
    res.json(post)
  } else {
    res.status(404).json({ message: 'Post not found' })
  }
})

type NewPostRequest = {
  title: string
  content: string
  categoriesIds: number[]
}

router.post('/', async (req, res) => {
  const { title, content, categoriesIds } = req.body as NewPostRequest

  const categories = await Promise.all(
    categoriesIds.map((id) => categoryRepository.getCategoryById(id))
  )

  if (categories.some((category) => !category)) {
    return res.status(400).json({ message: 'Invalid category ID(s)' })
  }

  const newPost = await postRepository.createPost({
    title,
    content,
    categories: {
      connect: categories.map((category) => ({ id: category!.id }))
    }
  })
  res.status(201).json(newPost)
})

router.put('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const { title, content, categoriesIds } = req.body as NewPostRequest

  try {
    // Validate categories if provided
    if (categoriesIds && categoriesIds.length > 0) {
      const categories = await Promise.all(
        categoriesIds.map((id) => categoryRepository.getCategoryById(id))
      )

      if (categories.some((category) => !category)) {
        return res.status(400).json({ message: 'Invalid category ID(s)' })
      }
    }

    const updatedPost = await postRepository.putPost(id, {
      title,
      content,
      categories: categoriesIds
        ? {
            set: categoriesIds.map((categoryId) => ({ id: categoryId }))
          }
        : undefined
    })
    res.json(updatedPost)
  } catch (error) {
    res.status(500).json({ message: 'Error updating post', error: error })
  }
})

router.patch('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const { title, content, categoriesIds } = req.body

  try {
    // Validate categories if provided
    if (categoriesIds && categoriesIds.length > 0) {
      const categories = await Promise.all(
        categoriesIds.map((id: number) =>
          categoryRepository.getCategoryById(id)
        )
      )

      if (categories.some((category) => !category)) {
        return res.status(400).json({ message: 'Invalid category ID(s)' })
      }
    }

    const updateData: Prisma.PostUpdateInput = {}
    if (title !== undefined) updateData.title = title
    if (content !== undefined) updateData.content = content
    if (categoriesIds !== undefined) {
      updateData.categories = {
        set: categoriesIds.map((categoryId: number) => ({ id: categoryId }))
      }
    }

    const updatedPost = await postRepository.patchPost(id, updateData)
    res.json(updatedPost)
  } catch (error) {
    res.status(500).json({ message: 'Error updating post', error: error })
  }
})

router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const isValid = await postRepository.getPostById(id)
  if (!isValid) {
    return res.status(500).json({ message: 'Error deleting post' })
  }
  await postRepository.deletePost(id)
  res.status(204).send()
})

export default router
