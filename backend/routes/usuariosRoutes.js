import express from 'express'
import { registrar } from '../controllers/usuarioController.js';
const router = express.Router();

// Autenticación, registro y confirmación de usuarios
router.post('/', registrar) //Crea un nuevo user

export default router //Lo exporta