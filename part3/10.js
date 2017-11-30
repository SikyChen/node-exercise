const express = require('express')
const app = express()

app.use('/static', express.static('./public'))

app.get('/images', (req, res) => {
  res.send('早上好')
})

app.use((req, res) => {
  res.status(404).send('<h2>404 Not Found!</h2>')
})

app.listen(8080)
console.log('server created..')