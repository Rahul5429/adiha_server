import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import routes from './routes/index.js'
import { env } from './config/env.js'
import { notFound, errorHandler } from './middleware/errorHandler.js'

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

app.get('/health', (_, res) => res.json({ ok: true }))

app.use('/api', routes)

app.use(notFound)
app.use(errorHandler)

export default app
