const express = require('express')
const colors = require('colors')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')
const { connectDB } = require('./config/db')

dotenv.config();

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// routes
app.use('/api/users', require('./Routes/userRoute'))

// connecter la base de donnees
connectDB()

app.get('/', (req, res) => {
  res.send('🚀 API de reseau social en marche');
});

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`serveur en marche sur le port ${PORT}}`.bgWhite)
})