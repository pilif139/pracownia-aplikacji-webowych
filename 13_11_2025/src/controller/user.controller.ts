import express from 'express'
import * as userRepository from '../repository/user.repository'

const router = express.Router()

router.get('/', (req, res, next) => {
  try {
    const users = userRepository.getAllUsers()
    res.json(users)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const user = await userRepository.getUserById(id)
    if (user) {
      res.json(user)
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    next(error)
  }
})

type NewUserRequest = {
  name: string
  email: string
  password: string
}

router.post('/', async (req, res, next) => {
  try {
    const { name, email, password } = req.body as NewUserRequest
    const newUser = await userRepository.createUser({
      name,
      email,
      password
    })
    res.status(201).json(newUser)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const data = req.body
    const updatedUser = await userRepository.putUser(id, data)
    res.json(updatedUser)
  } catch (error) {
    next(error)
  }
})

router.patch('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const data = req.body
    const updatedUser = await userRepository.patchUser(id, data)
    res.json(updatedUser)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const isValid = await userRepository.getUserById(id)
    if (!isValid) {
      return res.status(500).json({ message: 'Error deleting user' })
    }

    await userRepository.deleteUser(id)
    res.status(204).send()
  } catch (error) {
    next(error)
  }
})

export default router
