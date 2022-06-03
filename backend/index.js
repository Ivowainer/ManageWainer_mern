import express  from "express"
import dotenv from 'dotenv';

import conectarDB from "./config/db.js"
import usuarioRoutes from './routes/usuariosRoutes.js'

const app = express()

dotenv.config()

conectarDB()

// Routing
app.use('/api/usuarios', usuarioRoutes) //Express() usa la url '/api/usuarios' e importa y utuliza el router de usuariosRoutes

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`servidor corriendo en el puerto: ${PORT}`)
})