import Usuario from "../models/Usuario.js"
import Proyecto from "../models/Proyecto.js"
import Tarea from "../models/Tarea.js"

export const obtenerProyectos = async (req, res) => {
    const proyectos = await Proyecto.find().where("creador").equals(req.usuario).select('-tareas')

    res.json(proyectos)
}

export const nuevoProyecto = async (req, res) => {
    const proyecto = new Proyecto(req.body)
    proyecto.creador = req.usuario._id

    try {
        const proyectoAlmacenado = await proyecto.save()

        res.json(proyectoAlmacenado)
    } catch (error) {
        console.log(error)
    }
}

export const obtenerPoryecto = async (req, res) => {
    const { id } = req.params
    
    try {
        const proyecto = await Proyecto.findById(id).populate('tareas')

        if(!proyecto){
            const error = new Error('No encontrado')
            return res.status(404).json({ msg: error.message })
        }

        if(proyecto.creador.toString() !== req.usuario._id.toString()) {
            const error = new Error('No tienes los permisos')
            return res.status(401).json({ msg: error.message })
        }

        res.json(
            proyecto,
        )
        
    } catch (error) {
        return res.status(404).json({ msg: "No encontrado" })
    }
}

export const editarProyecto = async (req, res) => {
    const { id } = req.params
    
    try {
        const proyecto = await Proyecto.findById(id)

        if(!proyecto){
            const error = new Error('No encontrado')
            return res.status(404).json({ msg: error.message })
        }

        if(proyecto.creador.toString() !== req.usuario._id.toString()) {
            const error = new Error('No tienes los permisos')
            return res.status(401).json({ msg: error.message })
        }

        proyecto.nombre = req.body.nombre || proyecto.nombre;
        proyecto.descripcion = req.body.descripcion || proyecto.descripcion;
        proyecto.fechaEntrega = req.body.fechaEntrega || proyecto.fechaEntrega;
        proyecto.cliente = req.body.cliente || proyecto.cliente;

        const proyectoAlmacenado = await proyecto.save()

        res.json(proyectoAlmacenado)
        
    } catch (error) {
        return res.status(404).json({ msg: "No encontrado" })
    }
}

export const eliminarProyecto = async (req, res) => {
    const { id } = req.params

    try {
        const proyecto = await Proyecto.findById(id)

        if(!proyecto){
            const error = new Error('No encontrado')
            return res.status(404).json({ msg: error.message })
        }

        if(proyecto.creador.toString() !== req.usuario._id.toString()){
            const error = new Error("Acción no valida")
            return res.status(401).json({ msg: error.message })
        }

        try {
            await proyecto.deleteOne()
            res.json({ msg: "Proyecto eliminado" })
        } catch (error) {
            console.log(error)
        }
    } catch (error) {
        return res.status(404).json({ msg: "No encontrado" })
    }
}

export const buscarColaborador = async (req, res) => {
    const { email } = req.body

    const usuario = await Usuario.findOne({ email }).select('-confirmado -createdAt -password -token -updatedAt -__v')

    if(!usuario){
        const error = new Error('Usuario no encontrado')
        return res.status(404).json({ msg: error.message })
    }

    res.json(usuario)
}

export const agregarColaborador = async (req, res) => {}

export const eliminarColaborador = async (req, res) => {}