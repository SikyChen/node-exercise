const express = require('express')

const app = express()

app.use((req, res, next) => {
  console.log(new Date())
  next()
})

app.get('/siky', (req, res) => {
  res.send('Hello Siky!')
})

app.use('/admin', (req, res) => {
  //  /admin/aaa/bbb
  //  /admin
  //  /aaa/bbb
  res.send(`${req.originalUrl}<br>
            ${req.baseUrl}<br>
            ${req.path}<br>
            Hello ..`)
})

app.use('/', (req, res) => {
  res.send(404, '<h2>404 Not Found!</h2>')
})

app.listen(8080)
console.log('server created..')