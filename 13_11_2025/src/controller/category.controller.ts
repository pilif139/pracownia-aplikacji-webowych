import express from 'express'
import * as categoryRepository from '../repository/category.repository'

const router = express.Router()

router.get('/', async (req, res) => {
  const categories = await categoryRepository.getAllCategories()
  res.json(categories)
})

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const category = await categoryRepository.getCategoryById(id)
  if (category) {
    res.json(category)
  } else {
    res.status(404).json({ message: 'Category not found' })
  }
})

router.post('/', async (req, res) => {
  const data = req.body
  try {
    const newCategory = await categoryRepository.createCategory(data)
    res.status(201).json(newCategory)
  } catch (error) {
    res.status(500).json({ message: 'Error creating category', error: error })
  }
})

router.put('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const data = req.body
  try {
    const updatedCategory = await categoryRepository.putCategory(id, data)
    res.json(updatedCategory)
  } catch (error) {
    res.status(500).json({ message: 'Error updating category', error: error })
  }
})

router.patch('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const data = req.body
  try {
    const updatedCategory = await categoryRepository.patchCategory(id, data)
    res.json(updatedCategory)
  } catch (error) {
    res.status(500).json({ message: 'Error updating category', error: error })
  }
})

router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const isValid = await categoryRepository.getCategoryById(id)
  if (!isValid) {
    return res.status(500).json({ message: 'Error deleting category' })
  }

  await categoryRepository.deleteCategory(id)
  res.status(204).send()
})

export default router
