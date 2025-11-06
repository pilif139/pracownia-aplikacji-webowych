import express, { Express } from 'express'
import router from './routing'
import path from 'path'

const app: Express = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'static')))

app.use('/', router)

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})
