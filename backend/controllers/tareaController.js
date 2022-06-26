import Proyecto from '../models/Proyecto.js'
import Tarea from '../models/Tarea.js'

export const agregarTarea = async (req, res) => {
    const { proyecto } = req.body

    try {
        //Corrobora que existe proyecto
        const existeProyecto = await Proyecto.findById(proyecto)

        if(existeProyecto.creador.toString() !== req.usuario._id.toString()) {
            const error = new Error("No tienes los permisos para añadir tarea")
            return res.status(404).json({ msg: error.message })
        }

        //Una vez exista, almacena la creación de la tarea 
        try {
            const tareaAlmacenada = await Tarea.create(req.body)
            
            //Almacenar el ID en el proyecto
            existeProyecto.tareas.push(tareaAlmacenada._id)
            await existeProyecto.save()

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
    const { id } = req.params

    try {
        //Corroborar que existe proyecto
        const tarea = await Tarea.findById(id).populate("proyecto")
        
        //Corroborar si el proyecto y el creador son el mismo
        if(tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
            const error = new Error("Acción no valida")
            return res.status(403).json({ msg: error.message })
        }

        tarea.nombre = req.body.nombre || tarea.nombre
        tarea.descripcion = req.body.descripcion || tarea.descripcion
        tarea.prioridad = req.body.prioridad || tarea.prioridad
        tarea.fechaEntrega = req.body.fechaEntrega || tarea.fechaEntrega

        try {
            const tareaAlmacenada = await tarea.save()
            res.json(tareaAlmacenada)
        } catch (error) {
            console.log(error)
        }

    } catch {
        const error = new Error("No existe la tarea")
        return res.status(404).json({ msg: error.message })
    }
}

export const eliminarTarea = async (req, res) => {
    //Corrobora que la task exista
    try {
        const tarea = await Tarea.findById(req.params.id).populate('proyecto')

        //Corrobora que el usuario y el creador del proyecto sean el mismo
        if(tarea.proyecto.creador.toString() !== req.usuario._id.toString()){
            const error = new Error("No tienes permisos suficientes")
            return res.status(401).json({ msg: error.message })
        }

        tarea.deleteOne()

        return res.json({ msg: "Se ha eliminado correctamente" })
    } catch {
        const error = new Error("Esa tarea no existe")
        res.status(404).json({ msg: error.message })
    }

}

export const cambiarEstado = async (req, res) => {
    try {
        const tarea = await Tarea.findById(req.params.id).populate('proyecto')

        if(tarea.proyecto.creador.toString() !== req.usuario._id.toString() && !tarea.proyecto.colaboradores.some(colaborador => colaborador._id.toString() === req.usuario._id.toString())){
            const error = new Error("No tienes permisos suficientes")
            return res.status(401).json({ msg: error.message })
        }

        tarea.estado = !tarea.estado;
        await tarea.save()
        res.json(tarea)
    } catch (error) {
        console.log(error)
    }
}