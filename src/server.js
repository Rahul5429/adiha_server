import { createServer } from 'http'
import app from './app.js'
import './config/db.js'
import { env } from './config/env.js'

const server = createServer(app)

server.listen(env.PORT, () => {
  console.log(`🚀 API running on http://localhost:${env.PORT}`)
})
