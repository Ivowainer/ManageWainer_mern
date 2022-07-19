import Usuario from "../models/Usuario.js"
import generarId from "../helpers/generarId.js"
import generarJWT from "../helpers/generarJWT.js"
import { emailOlvidePassword, emailRegistro } from "../helpers/emails.js"

export const registrar = async (req, res) => {
    const { email } = req.body

    //Evitar registros duplicados
    const existeUsuario = await Usuario.findOne({ email })

    if(existeUsuario) {
        const error = new Error('Usuario ya registrado')
        return res.status(400).json({ msg: error.message })
    }

    //Guarda usuario 
    try {
        const usuario = new Usuario(req.body)
        usuario.token = generarId()

        await usuario.save()
        
        // Enviar el email de confirmación
        emailRegistro({ 
            email: usuario.email,
            nombre: usuario.nombre,
            token: usuario.token
        })

        res.json({ msg: "Usuario creado correctamente, revisa tu email para confirmar la cuenta" })
        

    } catch (error) {
        console.log(error)
    }
}

export const autenticar = async (req, res) => {
    const { email, password } = req.body

    //Comprobar si el usuario existe
    const usuario = await Usuario.findOne({ email })

    if(!usuario) {
        const error = new Error('El usuario no existe');
        return res.status(404).json({ msg: error.message })
    }

    //Comprobar si el usuario está confirmado
    if(!usuario.confirmado) {
        const error = new Error('Tu cuenta no ha sido confirmada');
        return res.status(403).json({ msg: error.message })
    }

    //Comprobar password
    if(await usuario.comprobarPassword(password)){

        res.json({ 
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario._id)
        })
    } else {
        const error = new Error('La contraseña es incorrecta')
        
        return res.status(403).json({ msg: error.message })
    }
}

export const confirmar = async (req, res) => {
    const { token } = req.params
    const usuarioConfirmar = await Usuario.findOne({token})

    if(!usuarioConfirmar){
        const error = new Error("Token no válido")
        return res.status(403).json({ msg: error.message })
    }

    try {
        usuarioConfirmar.confirmado = true;
        usuarioConfirmar.token = "";

        await usuarioConfirmar.save();

        res.json({ msg: "Usuario Confirmado Correctamente" })
    } catch (error) {
        console.log(error)
    }

}

export const olvidePassword = async (req, res) => {
    const { email } = req.body

    const usuario = await Usuario.findOne({ email })

    if(usuario.confirmado === false){
        const error = new Error('El usuario no está confirmado')
        return res.status(404).json({ msg: error.message })
    }

    if(!usuario){
        const error = new Error('El usuario no existe')
        return res.status(404).json({ msg: error.message })
    }

    try {
        usuario.token =  generarId()

        await usuario.save()

        //Enviando mail
        emailOlvidePassword({
            email: usuario.email,
            nombre: usuario.nombre,
            token: usuario.token 
        })

        res.json({ msg: "Hemos enviado un email con las instrucciones" })
    } catch (error) {
        console.log(error)
    }
}

export const comprobarToken = async (req, res) => {
    const { token } = req.params

    const tokenValido = await Usuario.findOne({ token })

    if(tokenValido){
        res.json({ msg: "Token valido y el usuario existe" })
    } else {
        const error = new Error("Token no valido");
        return res.status(404).json({ msg: error.message })
    }
}

export const nuevoPassword = async (req, res) => {
    const { token } = req.params
    const { password } = req.body

    const usuario = await Usuario.findOne({ token })

    if(usuario){
        usuario.password = password
        usuario.token = ''

        await usuario.save()

        res.json({ msg: "Password modificada correctamente" })
    } else {
        const error = new Error("Token no válido")
        return res.status(404).json({ msg: error.message })
    }
}

export const cerrarSesion = async(req, res) => {
    res.clearCookie('token')

    res.send('cookie token cleared');
}

export const perfil = async (req, res)  => {
    const { usuario } = req

    res.json(usuario)
}