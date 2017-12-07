const express = require('express')
,session = require('express-session')

,app = express()

// session 要引入这个包使用
// 使用 session 必须要使用 express-session 插件
app.use(session({
  secret: 'keyboard cat'
  ,resave: false
  ,saveUninitialized: true
}))

app.get('/', (req, res) => {
  if(req.session.isLogin == 1) {
    res.send('欢迎' + req.session.username)
  }else {
    res.send('没有登录，请先登录')
  }
})

app.get('/login', (req, res) => {
  // session 的设置和读取，都是在 req.session 中操作
  req.session.isLogin = 1
  req.session.username = 'Siky'
  res.send('登陆成功，欢迎' + req.session.username)
})

app.listen(8080)
console.log('server created..')