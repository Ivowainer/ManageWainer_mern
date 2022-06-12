import checkAuth from "../middleware/checkAuth.js";
import { agregarColaborador, editarProyecto, eliminarColaborador, eliminarProyecto, nuevoProyecto, obtenerPoryecto, obtenerProyectos, obtenerTareas } from "../controllers/proyectoController.js";

import express from 'express'
const router = express.Router()

router
    .route('/')
    .get(checkAuth, obtenerProyectos)
    .post(checkAuth, nuevoProyecto)

router
    .route('/:id')
    .get(checkAuth, obtenerPoryecto)
    .put(checkAuth, editarProyecto)
    .delete(checkAuth, eliminarProyecto)

router.get('/tareas/:id', checkAuth, obtenerTareas)
router.post('/agregar-colaboradores/:id', checkAuth, agregarColaborador)
router.post('/agregar-colaboradores/:id', checkAuth, eliminarColaborador)


export default router