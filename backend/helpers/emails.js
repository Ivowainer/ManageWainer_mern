import nodemailer from 'nodemailer'

import { google } from 'googleapis'
const OAuth2 = google.auth.OAuth2

import dotenv from 'dotenv'
dotenv.config()

const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
const refreshToken = process.env.REFRESH_TOKEN

const oauth2client = new OAuth2(clientId, clientSecret, "https://developers.google.com/oauthplayground")

oauth2client.setCredentials({refresh_token: refreshToken})

export const emailRegistro = async (datos) => {
    const { email, nombre, token } = datos

    try {
        const accessToken = await oauth2client.getAccessToken()
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "ivancamposwainer@gmail.com",
                clientId,
                clientSecret,
                refreshToken,
                accessToken: accessToken
            }
        })

        // Información del email
        const info = await transport.sendMail({
            from: ' "ManagerWainer - Administrador de Proyectos" <cuentas@managerwainer.com>', 
            to: email,
            subject: "ManagerWainer - Confirma tu cuenta",
            text: "Confirma tu cuenta en ManagarWainer",
            html: `
                <p>Hola: ${nombre}, confirma tu cuenta en ManagerWainer</p>
                <p>Tu cuenta ya esta casi lista, solo debes comprobarla en el siguiente enlace:
                <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Confirmar Cuenta </a>
                <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
            `
        })
    } catch (error) {
        console.log(error)
    }
}

export const emailOlvidePassword = async (datos) => {
    const { email, nombre, token } = datos

    try {
        const accessToken = await oauth2client.getAccessToken()
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "ivancamposwainer@gmail.com",
                clientId,
                clientSecret,
                refreshToken,
                accessToken: accessToken
            }
        })

        // Información del email
        const info = await transport.sendMail({
            from: ' "ManagerWainer - Administrador de Proyectos" <cuentas@ManagerWainer.com>', 
            to: email,
            subject: "ManagerWainer - Restablece tu password",
            text: "Restablece tu password en ManagerWainer",
            html: `
                <p>Hola: ${nombre}, has solicitado restablecer tu password</p>
                <p>Sigue el siguiente enlace para generar un nuevo password</p>
                <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Restablecer Password</a>
                <p>Si tu no solicitaste email, puedes ignorar el mensaje</p>
            `
        })
    } catch (error) {
        console.log(error)
    }
}

