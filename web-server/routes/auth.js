import { Router } from "express";
import { USERS_BBDD } from "../bbdd.js";
const authRouter = Router();
import checkEmailPasswd from '../helpers/checkEmailPasswd.js'
// Endpoint public (No autenticado y no autorizado)
authRouter.get("/publico", (req, res) => {
    return res.end("Endpoint publico")
})
// Endpoint antenticado para todo usuario registrado

authRouter.post("/autenticado", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).end("Necesitas pasar un email y contraseña")
    try {
        const user = checkEmailPasswd(email, password)

        return res.end("Autenticacion correcta")
    } catch (error) {
        return res.status(401).end(error.message)
    }

})

// Endpoint autorizado a administrados y/o editores

authRouter.post('/autorizado', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).end("Necesitas pasar un email y contraseña")
    try {
        const user = checkEmailPasswd(email, password)
        console.log(user)
        if (user.role !== 'admin') return res.status(403).end("No estás autorizado")
        return res.end("Autorizado! " + user.name)
    } catch (error) {
        return res.status(401).end(error.message)
    }

})
export default authRouter;