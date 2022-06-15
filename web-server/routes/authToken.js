import { Router } from "express";
import checkEmailPasswd from "../helpers/checkEmailPasswd.js";
import { SignJWT, jwtVerify } from 'jose'
import { USERS_BBDD } from "../bbdd.js";
import validateLoginDTO from "../dto/validateLoginDTO.js";
const authTokenRouter = Router();
const encoder = new TextEncoder()
// Login con email y password
authTokenRouter.post('/login', validateLoginDTO, async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).end("Tienes que introducir email y password")
    try {
        const { guid } = checkEmailPasswd(email, password)

        const jwtConstructor = new SignJWT({ guid });


        const jwt = await jwtConstructor
            .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
            .setIssuedAt()
            .setExpirationTime('1h').sign(encoder.encode(process.env.JWT_PRIVATE_KEY))

        return res.send({ jwt })
    } catch (error) {
        return res.status(401).end(error.message)
    }
})
authTokenRouter.get("/mi-perfil", async (req, res) => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).end("No se ha especificado la cabecera authorization")
    try {

        const { payload } = await jwtVerify(authorization, encoder.encode(process.env.JWT_PRIVATE_KEY))
        console.log(payload)
        const user = USERS_BBDD.find(user => user.guid === payload.guid)
        if (!user) return res.status(401).send("No se ha encontrado al usuario")
        delete user.password
        return res.send(user)
    } catch (error) {
        console.log(error)
        return res.status(401).end("Error al verificar el jwt\n" + error.message)
    }

})
export default authTokenRouter;