console.clear()
import { createServer } from 'http'
import dotenv from 'dotenv'
import express from 'express'
import { USERS_BBDD } from './bbdd.js'
dotenv.config();
const PUERTO = process.env.PORT
const expressApp = express()

expressApp.use(express.json())
expressApp.use(express.text())

//Obtener los detalles de una cuenta 

//Crear una nueva cuetna

//Actualizar una cuenta

//Eliminar una cuenta

expressApp.get('/', (req, res) => {
    if (req.query?.nombre === 'bryan') {
        res.json({
            "nombre": "bryan",
            "apellido": "cusme"
        })
        //res.end(`<html><h1>Bienvenido ${req.query?.nombre}</h1></html>`)
    } else if (req.query?.nombre === 'carmen') {
        res.end(`El apellido de ${req.query?.nombre} es Marcos`)
    } else {
        res.status(401).send("No se autoriza al usuario " + req.query?.nombre)
    }
})
expressApp.get('/cuenta/:idCuenta', (req, res) => {
    res.end(`Bienvenido usuario con cuenta ${req.params.idCuenta}`)
    console.log(req.body)
})

// La ruta 404 se debe especificar siempre al final
expressApp.get('*', (req, res) => {
    res.status(404).send("No se encuentra el recurso")
});
expressApp.listen(PORT, () => {
    console.log(`Servidor levantado en puerto ${PORT}`)
})
// const server = createServer((req, res) => {
//     let data = ''
//     let chunkIndex = 0
//     req.setEncoding('utf-8')
//     if (req.method === 'POST') {

//         req.on('data', (chunk) => {
//             data += chunk;
//             chunkIndex++
//             console.log(chunkIndex, chunk)
//         })
//         req.on('end', () => {
//             console.log("Recibido POST method", data.toString())
//         })

//     } else if (req.method !== 'POST') {
//         res.end(req.method)
//     }
//     console.log('PETICION RECIBIDA')

// })

//server.listen(3000)