import express  from "express"
import dotenv from 'dotenv';
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { Server } from 'socket.io'

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

const servidor = app.listen(PORT, () => {
    console.log(`servidor corriendo en el puerto: ${PORT}`)
})

//Socket.io
const io = new Server(servidor, {
    pingTimeout: 60000,
    cors: {
        origin: process.env.FRONTEND_URL,
    },
});

io.on('connection', (socket) => {
    // Definir eventos de Socket Io
    socket.on('abrir_proyecto', (proyecto) => {
        socket.join(proyecto)
    });

    socket.on("nueva_tarea", (tarea) => {
        socket.to(tarea.proyecto).emit('agregar_tarea', tarea)
    });

    socket.on('eliminar_tarea', tarea => {
        socket.to(tarea.proyecto).emit('tarea_eliminada', tarea)
    })

    socket.on('actualizar_tarea', tarea => {
        socket.to(tarea.proyecto._id).emit('tarea_actualizada', tarea)
    })

    socket.on('cambiar_estado', tarea => {
        socket.to(tarea.proyecto._id).emit('nuevo_estado', tarea)
    })

})