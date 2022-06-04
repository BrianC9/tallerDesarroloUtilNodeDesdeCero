import { Router } from "express";
import checkEmailPasswd from "../helpers/checkEmailPasswd.js";
import { nanoid } from "nanoid";
import { USERS_BBDD } from "../bbdd.js";
const authSessionRouter = Router();
const sessions = [];

authSessionRouter.post("/login", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).end("Tienes que introducir email y password")
    try {
        const user = checkEmailPasswd(email, password)
        const { guid } = user
        // Este id se debería guardar en una base de datos
        const sessionId = nanoid()

        // Antes de guardar un session id se debería comprobar que ese id no existe ya
        sessions.push({ sessionId, guid })
        res.cookie('sessionId', sessionId, { httpOnly: true })
        return res.end("Autenticacion correcta de " + user.name)
    } catch (error) {
        return res.status(401).end(error.message)
    }
})

authSessionRouter.get("/mi-perfil", (req, res) => {
    console.log(req.cookies)
    const { cookies } = req;
    if (!cookies.sessionId) return res.status(401).send("No existe un cookie sessionId")

    const userSession = sessions.find(session => session.sessionId === cookies.sessionId)
    if (!userSession) return res.status(401).send("No figura esa session en la base de datos [sessions]")

    const user = USERS_BBDD.find(user => user.guid === userSession.guid)
    if (!user) return res.status(401).send("No concide el guid con la sesión almacenada")
    delete user.password
    return res.send(user)
})
export default authSessionRouter;