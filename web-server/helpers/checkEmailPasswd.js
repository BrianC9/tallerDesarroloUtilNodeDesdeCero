import { USERS_BBDD } from "../bbdd.js"
const checkEmailPassword = (email, passwd) => {
    const user = USERS_BBDD.find((usuario) => usuario.email === email)
    if (!user) throw new Error("No existe el usuario")

    if (user.password !== passwd) throw new Error("No coinciden las contraseñas");
    return user;
}
export default checkEmailPassword;