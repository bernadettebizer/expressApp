const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('pages/index', { title: 'Hey', message: 'Hello, beautiful world!' }))

app.get('/about', (req, res) => res.render('pages/about', { title: 'About', message: 'How ya doin today?' }))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))