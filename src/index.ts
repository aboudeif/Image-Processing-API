import express from 'express'
import path from 'path'
import routes from './routes/routes'

const api = express()
const port = 3000

api.use(routes)

api.listen(port)

export default api
