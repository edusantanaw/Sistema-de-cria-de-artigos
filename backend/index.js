const express = require('express')
const cors = require('cors')
const app = express()
const articles = require('./routes/articleRoutes')
const user = require('./routes/userRoutes')

app.use(cors({ credentials: true, origin:  "http://localhost:3000"}))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))
app.use('/article', articles)
app.use('/user', user)


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('Programa iniciando...')
})
