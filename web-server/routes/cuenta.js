import express from "express";
import { USERS_BBDD } from '../bbdd.js'

const cuentaRouter = express.Router();
//Creacion de un middleware propio

cuentaRouter.use((req, res, next) => {
    console.log(req.ip);
    next();
})

//Obtener los detalles de una cuenta a partir del guid

cuentaRouter.get('/:guid', (req, res) => {
    const idConsulta = req.params.guid
    const usuario = USERS_BBDD.find((usuario) => usuario.guid === idConsulta)
    if (!usuario) return res.status(404).send("No se ha encontrado el usuario con id: " + idConsulta)
    return res.send(usuario)
})

//Crear una nueva cuenta a partir de guid y name
cuentaRouter.post('/', (req, res) => {
    const { guid, name } = req.body
    if (!guid || !name) return res.status(400).send("No se ha especificado un guid o name")
    const usuario = USERS_BBDD.find((usuario) => usuario.guid === guid)
    if (usuario) return res.status(409).send("Ya existe el usuario en la BBDD")
    USERS_BBDD.push({ guid, name })
    return res.send("Se ha creado el nuevo usuario: \n" + name)

})

//Actualizar el nombre de una cuenta
cuentaRouter.patch('/:guid', (req, res) => {
    const idConsulta = req.params.guid
    const { name } = req.body
    if (!name) return res.status(400).send("No se ha escpecificado el nuevo nombre")
    const usuario = USERS_BBDD.find((usuario) => usuario.guid === idConsulta)
    if (!usuario) return res.status(404).send("No se ha encontrado el usuario con id: " + idConsulta)
    usuario.name = name
    return res.send("Se ha actualizado el nombre a: " + usuario.name)

})

//Eliminar una cuenta
cuentaRouter.delete('/:guid', (req, res) => {
    const idConsulta = req.params.guid
    const usuarioIndex = USERS_BBDD.findIndex((usuario) => usuario.guid === idConsulta)
    if (usuarioIndex === -1) return res.status(404).send("No se ha encontrado el usuario con id: " + idConsulta)
    const usuarioEliminado = USERS_BBDD[usuarioIndex]

    USERS_BBDD.splice(usuarioIndex, 1)
    return res.send("Se ha eliminado correctamente el siguiente usuario\n" + usuarioEliminado.name)
})

export default cuentaRouter;