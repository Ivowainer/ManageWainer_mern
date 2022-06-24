import nodemailer from 'nodemailer'

export const emailRegistro = async (datos) => {
    console.log(datos)
    const { email, nombre, token } = datos

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
    });

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
}

export const emailOlvidePassword = async (datos) => {
    console.log(datos)
    const { email, nombre, token } = datos

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
    });

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
}

