const express = require('express')

let app = express()

app.use(express.static('./public'))

app.get('/haha', (req, res) => {
  res.send('hahahahaha!')
})

app.listen(8080)
console.log('server created...')