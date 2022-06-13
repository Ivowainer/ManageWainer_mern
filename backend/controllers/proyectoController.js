import Proyecto from "../models/Proyecto.js"

export const obtenerProyectos = async (req, res) => {
    const proyectos = await Proyecto.find().where("creador").equals(req.usuario)

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
        const proyecto = await Proyecto.findById(id)

        if(!proyecto){
            const error = new Error('No encontrado')
            return res.status(404).json({ msg: error.message })
        }

        if(proyecto.creador.toString() !== req.usuario._id.toString()) {
            const error = new Error('No tienes los permisos')
            return res.status(401).json({ msg: error.message })
        }

        res.json(proyecto)
        
    } catch (error) {
        return res.status(404).json({ msg: "No encontrado" })
    }
}

export const editarProyecto = async (req, res) => {}

export const eliminarProyecto = async (req, res) => {}

export const agregarColaborador = async (req, res) => {}

export const eliminarColaborador = async (req, res) => {}

export const obtenerTareas = async (req, res) => {}