import Proyecto from '../models/Proyecto.js'
import Tarea from '../models/Tarea.js'

export const agregarTarea = async (req, res) => {
    const { proyecto } = req.body

    try {
        const existeProyecto = await Proyecto.findById(proyecto)

        if(existeProyecto.creador.toString() !== req.usuario._id.toString()) {
            const error = new Error("No tienes los permisos para añadir tarea")
            return res.status(404).json({ msg: error.message })
        }

        try {
            const tareaAlmacenada = await Tarea.create(req.body)
            res.json(tareaAlmacenada)
        } catch (error) {
            console.log(error)
        }
        
    } catch (error) {
        error = new Error("No existe el proyecto")
        return res.status(404).json({ msg: error.message })
    }
}

export const obtenerTarea = async (req, res) => {
    const { id } = req.params

    try {
        const tarea = await Tarea.findById(id).populate("proyecto")

        if(tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
            const error = new Error("Accion no valida")
            return res.status(403).json({ msg: error.message })
        }

        res.json(tarea)
    } catch {
        const error = new Error("Esa tarea no existe")
        return res.status(404).json({ msg: error.message })
    }

    
}

export const actualizarTarea = async (req, res) => {

}

export const eliminarTarea = async (req, res) => {

}

export const cambiarEstado = async (req, res) => {
    
}