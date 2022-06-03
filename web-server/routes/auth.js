import { Router } from "express";
import { USERS_BBDD } from "../bbdd.js";
const authRouter = Router();

// Endpoint public (No autenticado y no autorizado)
authRouter.get("/publico", (req, res) => {
    return res.end("Endpoint publico")
})
// Endpoint antenticado

authRouter.post("/autenticado", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.send(400).end("Necesitas pasar email y contraseña")

    const user = USERS_BBDD.find((usuario) => usuario.email === email)
    if (!user) return res.end("No existe ese usuario")

    if (user.password !== password) return res.end("no coinciden las password")
    return res.json({ user })
})

// Endpoint autorizado

export default authRouter;