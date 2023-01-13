const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
require('dotenv').config()

const app = express()

// Capturar body
app.use(bodyparser.urlencoded({
    extended: false
}))
app.use(bodyparser.json())

//Conexion a BD
const url = `mongodb+srv://aidcran:12345678cris@cluster0.yhveoch.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`
mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(() => console.log('Conectado a la Base de Datos'))
  .catch((error) => console.log('Error de Conexion: ' + error))

//Importar las rutas
const authRoutes = require('./routes/auth')

// Ruta para el middleware
app.use('/api/user', authRoutes)


app.get('/', (req, res) => {
    res.json({
        estado: true,
        mensaje: 'Funciona Correcto'
    })
})

// Arrancar el servidor
const PORT = process.env.PORT || 3005
app.listen(PORT, () => {
    console.log(`Servidor en Ejecucion: ${PORT}`)
})