const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/about', (req, res) => {
  res.send('Welcome to about page')
})
app.get('/projects', (req, res) => {
  res.send('Welcome to project page')
})
app.get('/contact', (req, res) => {
  res.send('Welcome to contact page')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
