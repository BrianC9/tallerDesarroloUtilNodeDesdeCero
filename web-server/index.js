console.clear()

import dotenv from 'dotenv'
import express from 'express'
import cuentaRouter from './routes/cuenta.js'
import authRouter from './routes/auth.js'
import authTokenRouter from './routes/authToken.js'
import authSessionRouter from './routes/authSession.js'
import cookieParser from 'cookie-parser'
// Uso de variables de entorno
dotenv.config();

const PUERTO = process.env.PORT
// Instanciamos express para crear la aplicación con este framework y no con Node.js nativo
const expressApp = express()

expressApp.use(express.json())
expressApp.use(express.text())
expressApp.use(cookieParser())
// Para usuar el Router de express le especificamos la ruta que queremos que vigile y el modulo 
// si no especificamos un path y ejecutamos un middleware en cuentaRouter, se ejecutará en todos los endpoints
// Ya que lo tomará como el raiz "/"
expressApp.use("/cuenta", cuentaRouter)
expressApp.use("/auth", authRouter);
expressApp.use("/auth-token", authTokenRouter)
expressApp.use("/auth-session", authSessionRouter)

expressApp.listen(PUERTO, () => {
    console.log("Servidor levantado en el puerto " + PUERTO)
})
