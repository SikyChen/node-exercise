const express = require('express')
,session = require('express-session')
,bodyParser = require('body-parser')
,db = require('./model/db')

,app = express()

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

// session 要引入这个包使用
// 使用 session 必须要使用 express-session 插件
app.use(session({
  secret: 'keyboard cat'
  ,resave: false
  ,saveUninitialized: true
}))

app.use(express.static('./public'))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  if(req.session.isLogin == 1) {
    res.send('欢迎' + req.session.username)
  }else {
    res.send('没有登录，请先<a href="/login">登录</a>')
  }
})

app.get('/login', (req, res) => {
  res.render('login')
})

app.post('/api/doLogin', (req, res) => {
  let username = req.body.username
  ,password = req.body.password

  db.find('user2', 
  {
    username: username
  }, 
  {}, 
  (err, result) => {
    if(err) {
      console.log('查找失败')
      console.log(err)
      return
    }
    if(result.length == 0) {
      res.json({status: 2, msg: '没有这个用户'})
      return
    }
    if(result[0].password != password) {
      res.json({status: 3, msg: '密码错误'})
      return
    }else {
      req.session.isLogin = 1
      req.session.username = username
      res.json({status: 1, msg: '登陆成功'})
    }
  })
})

app.listen(8080)
console.log('server created..')