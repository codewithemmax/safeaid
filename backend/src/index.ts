import 'dotenv/config'

import cors from 'cors'
import express from 'express'

import webhookRouter from './routes/webhook'

const app = express()
const PORT = process.env.PORT ?? 3001

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.use('/webhook', webhookRouter)

app.listen(PORT, () => {
  console.error(`Server running on port ${PORT}`)
})
