const express = require('express')

let app = express()

app.get('/', (req, res) => {
  res.send(`<h1>hello, express!</h1>`)
})

app.get('/haha', (req, res) => {
  res.send('hahahahahaha!')
})

app.get(/^\/student\/([\d]{10})$/, (req, res) => {
  console.log('req:', req.params)
  res.send('学生信息，学号：' + req.params[0])
})

app.get('/teacher/:jobNumber', (req, res) => {
  console.log('req:', req.params)
  res.send('教师信息，工号：' + req.params.jobNumber)
})

app.listen(8080)

console.log('server created..')