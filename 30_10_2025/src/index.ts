import express from 'express'
import type { Express } from 'express'
import router from './routing'
import path from 'path'
import getApiRouter from './api.route'

const app: Express = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'static')))

app.use('/', router)
// ;(async () => {
//   const apiRouter = await getApiRouter()
//   app.use('/', apiRouter)
// })()

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})
