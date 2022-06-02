const express = require('express');

const app = express()

console.log('Desde index.js')

app.listen(4000, () => {
    console.log('servidor corriendo en el puerto: 4000')
})