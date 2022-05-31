console.clear()

import dotenv from 'dotenv'
import express from 'express'

import cuentaRouter from './routes/cuenta.js'

dotenv.config();
const PUERTO = process.env.PORT
const expressApp = express()

expressApp.use(express.json())
expressApp.use(express.text())
expressApp.use(cuentaRouter)

expressApp.listen(PUERTO)
