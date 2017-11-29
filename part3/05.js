
const express = require('express')

const app = express()

app.set('view engine', 'ejs')

app.route('/')
  .get((req, res) => {
    res.render('form')
  })
  .post((req, res) => {
    res.send('提交成功！')
  })

app.listen(8080)

console.log('server created...')