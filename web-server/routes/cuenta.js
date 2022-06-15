import { Router } from "express";
import { USERS_BBDD } from '../bbdd.js'
import userModel from "../schemas/userSchema.js";

const cuentaRouter = Router();
//Creacion de un middleware propio

cuentaRouter.use((req, res, next) => {
    console.log(req.ip);
    next();
})

//Obtener los detalles de una cuenta a partir del guid

cuentaRouter.get('/:guid', async (req, res) => {
    const idConsulta = req.params.guid
    const usuario = await userModel.findById(idConsulta).exec()
    if (!usuario) return res.status(404).send("No se ha encontrado el usuario con id: " + idConsulta)
    return res.send(usuario)
})

//Crear una nueva cuenta a partir de guid y name
cuentaRouter.post('/', async (req, res) => {
    const { guid, name } = req.body
    if (!guid || !name) return res.status(400).send("No se ha especificado un guid o name")
    const usuario = await userModel.findById(guid).exec()
    if (usuario) return res.status(409).send("Ya existe el usuario en la BBDD")

    const newUser = new userModel({ _id: guid, name })
    await newUser.save()
    return res.send("Se ha creado el nuevo usuario: \n" + newUser.name)

})

//Actualizar el nombre de una cuenta
cuentaRouter.patch('/:guid', async (req, res) => {
    const idConsulta = req.params.guid
    const { name } = req.body
    if (!name) return res.status(400).send("No se ha escpecificado el nuevo nombre")
    const usuario = await userModel.findById(idConsulta).exec()
    if (!usuario) return res.status(404).send("No se ha encontrado el usuario con id: " + idConsulta)
    usuario.name = name
    await usuario.save()
    return res.send("Se ha actualizado el nombre a: " + usuario.name)

})

//Eliminar una cuenta
cuentaRouter.delete('/:guid', async (req, res) => {
    const idConsulta = req.params.guid
    const usuario = await userModel.findById(idConsulta).exec()
    if (!usuario) return res.status(404).send("No se ha encontrado el usuario con id: " + idConsulta)
    const usuarioEliminado = usuario.name
    await usuario.remove()
    return res.send("Se ha eliminado correctamente el siguiente usuario\n" + usuarioEliminado)
})

export default cuentaRouter;