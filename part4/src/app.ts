import express from 'express'
import mongoose from 'mongoose'

const app = express()

app.use(express.json())

// basic placeholder route
app.get('/', (req, res) => {
  res.send({ status: 'part4 bloglist api' })
})

export default app
