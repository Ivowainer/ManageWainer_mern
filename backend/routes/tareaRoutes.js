import { actualizarTarea, agregarTarea, cambiarEstado, eliminarTarea, obtenerTarea } from '../controllers/tareaController.js'
import checkAuth from "../middleware/checkAuth.js";
import express from 'express'

const router = express.Router()

router.post('/', agregarTarea)
router
    .route('/:id')
    .get(checkAuth, obtenerTarea)
    .put(checkAuth, actualizarTarea)
    .delete(checkAuth, eliminarTarea)

router.post('/estado/:id', checkAuth, cambiarEstado)

export default router