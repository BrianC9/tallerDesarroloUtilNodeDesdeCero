import { Router } from "express";
import checkEmailPassword from "../helpers/checkEmailPasswd.js";
const authTokenRouter = Router();

// Login con email y password
authTokenRouter.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).end("Tienes que introducir email y password")
    try {
        const user = checkEmailPasswd(email, password)

        return res.end("Autenticacion correcta de " + user.name)
    } catch (error) {
        return res.status(401).end(error.message)
    }
})
export default authTokenRouter;