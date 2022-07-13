import express  from "express"
import dotenv from 'dotenv';
import cors from 'cors'
import cookieParser from 'cookie-parser'

import conectarDB from "./config/db.js"
import usuarioRoutes from './routes/usuariosRoutes.js'
import proyectoRoutes from './routes/proyectoRoutes.js'
import tareaRoutes from './routes/tareaRoutes.js'

const app = express()
app.use(express.json());

// Middl
app.use(cookieParser())
dotenv.config()
conectarDB()

//Cors
const corsOptions = {
    origin: function(origin, callback){
        if([process.env.FRONTEND_URL].includes(origin)){
            // Puede consultar la API
            callback(null, true);
        } else {
            // No se permite su Request
            callback(new Error('Error de Cors'))
        }
    },
    credentials: true
}
app.use(cors(corsOptions))

// Routing
app.use('/api/usuarios', usuarioRoutes)
app.use('/api/proyectos', proyectoRoutes)
app.use('/api/tareas', tareaRoutes)


const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`servidor corriendo en el puerto: ${PORT}`)
})