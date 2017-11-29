const express = require('express')
let app = express()

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  let d = {
    news: ['为何频频失窃？', '油腻的师姐在哪里', '一步一个坑']
  }
  res.render('news', d)
})

app.listen(8080)
console.log('server created...')