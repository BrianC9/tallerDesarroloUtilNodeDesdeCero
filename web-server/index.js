console.clear()

import dotenv from 'dotenv'
import express from 'express'

import cuentaRouter from './routes/cuenta.js'

dotenv.config();
const PUERTO = process.env.PORT
const expressApp = express()

expressApp.use(express.json())
expressApp.use(express.text())
// Para usuar el Router de express le especificamos la ruta que queremos que vigile y el modulo 
// si no especificamos un path y ejecutamos un middleware en cuentaRouter, se ejecutará en todos los endpoints
// Ya que lo tomará como el raiz "/"
expressApp.use("/cuenta", cuentaRouter)

expressApp.listen(PUERTO)
