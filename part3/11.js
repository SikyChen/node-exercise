const express = require('express')
const app = express()

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('news', {news:['油腻的师姐在哪里','极品装备，一刀就爆']})
})

app.get('/check', (req, res) => {
  res.send({
    'user': 'siky'
  })
})

app.listen(8080)
console.log('server created..')