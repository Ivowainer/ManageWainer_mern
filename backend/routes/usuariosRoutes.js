import express from 'express'
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Desde api/Usuarios')
}) //Obtiene el URL actual, es decir "/api/usuarios"

export default router //Lo exporta