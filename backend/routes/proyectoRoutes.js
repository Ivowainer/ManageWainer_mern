import checkAuth from "../middleware/checkAuth.js";
import { buscarColaborador, agregarColaborador, editarProyecto, eliminarColaborador, eliminarProyecto, nuevoProyecto, obtenerPoryecto, obtenerProyectos } from "../controllers/proyectoController.js";

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

router.post('/colaboradores', checkAuth, buscarColaborador)
router.post('/colaboradores/:id', checkAuth, agregarColaborador)
router.post('/eliminar-colaborador/:id', checkAuth, eliminarColaborador)


export default router