import express from 'express'
import * as categoryRepository from '../repository/category.repository'

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const categories = await categoryRepository.getAllCategories()
    res.json(categories)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const category = await categoryRepository.getCategoryById(id)
    res.json(category)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const data = req.body
    const newCategory = await categoryRepository.createCategory(data)
    res.status(201).json(newCategory)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const data = req.body
    const updatedCategory = await categoryRepository.putCategory(id, data)
    res.json(updatedCategory)
  } catch (error) {
    next(error)
  }
})

router.patch('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const data = req.body
    const updatedCategory = await categoryRepository.patchCategory(id, data)
    res.json(updatedCategory)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const isValid = await categoryRepository.getCategoryById(id)
    if (!isValid) {
      return res.status(400).json({ message: 'Error deleting category' })
    }

    await categoryRepository.deleteCategory(id)
    res.status(204).send()
  } catch (error) {
    next(error)
  }
})

export default router
