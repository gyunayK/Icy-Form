import 'dotenv/config';
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import methodOverride from 'method-override'
import bodyParser from 'body-parser'
import path from 'path'
import { fileURLToPath } from 'url'

import formRouter from './routes/form.router'
import connectDB from './service/mongodb'

const app: express.Express = express()
const port = 3000

const __dirname = path.dirname(fileURLToPath(import.meta.url))

connectDB()

app.use(morgan('dev'))
app.use(cors())
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
  res.json({
    message: 'Hello world'
  })
})

// Serve the static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))

app.use('/api', formRouter)

app.listen(port, () => {
  console.log(`App is running on port: ${port}`)
})

export default app
