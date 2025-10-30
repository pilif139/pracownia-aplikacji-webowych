import express from 'express'
import path from 'path'

const router = express()

type ContactForm = {
  name: string
  surname: string
  email: string
  message: string
}

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

router.get('/o-nas', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'o-nas.html'))
})

router.get('/kontakt', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'kontakt.html'))
})

router.get('/oferta', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'oferta.html'))
})

router.post('/kontakt', (req, res) => {
  const { name, surname, email, message } = req.body as ContactForm
  console.log('Name:', name)
  console.log('Surname:', surname)
  console.log('Email:', email)
  console.log('Message:', message)
  res.redirect('/')
})

export default router
