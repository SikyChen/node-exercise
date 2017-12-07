const express = require('express')
,cookieParser = require('cookie-parser')

,app = express()

// 使用cookie必须要使用cookie-parser插件
app.use(cookieParser())

app.get('/', (req, res) => {
  let mayLike = req.cookies.targets || ''
  res.send(`猜你喜欢：${mayLike}`)
})

// 查询一个地方的攻略
// URL语法： http://127.0.0.1/gonglue?mididi=北京
// 此时将“北京”记录在cookie中
app.get('/gonglue', (req, res) => {
  let target = req.query.target
  let targets = req.cookies.targets || []
  targets.push(target)
  res.cookie('targets', targets, {maxAge: 9000000, httpOnly: true})
  res.send(target + '旅游攻略')
})

app.listen(8080)
console.log('server created..')