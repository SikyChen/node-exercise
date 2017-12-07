const express = require('express')
,app = express()
,bodyParser = require('body-parser')
,db = require('./model/db')
,md5 = require('./model/md5')
,session = require('express-session')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

// session 要引入这个包使用
// 使用 session 必须要使用 express-session 插件
app.use(session({
  secret: 'keyboard cat'
  ,resave: false
  ,saveUninitialized: true
}))

app.set('view engine', 'ejs')

app.use(express.static('./public'))

app.get('/', (req, res) => {
  if(req.session.isLogin != 1) {
    res.send('还未登录，请<a href="/login">登录</a>')
  }else {
    res.render('index', {
      username: req.session.username
    })
  }
})

app.get('/regist', (req, res) => {
  res.render('regist')
})

app.post('/api/doRegist', (req, res) => {
  let username = req.body.username
  ,password = req.body.password
  if(!username || !password) {
    res.json({status: 2, msg: '账号和密码不可为空'})
    return
  }
  db.find('users', {username: username}, {}, (err, result) => {
    if(err) {
      res.json({status: 2, msg: 'error when read db..'})
      console.log(err)
      return
    }
    if(result.length > 0) {
      res.json({status: 2, msg: '账号已存在，请更换账号'})
      return
    }
    let pwmd5 = md5(md5(password) + md5('loveSiky'))
    db.insertOne('users', {
      username: username
      ,password: pwmd5
    }, (err, result) => {
      if(err) {
        res.json({status: 2, msg: 'error when insert db..'})
        console.log(err)
        return
      }
      res.json({status: 1, msg: 'success'})
    })
  })
})

app.get('/login', (req, res) => {
  if(req.session.isLogin == 1) {
    res.redirect('/')
  }else {
    res.render('login')
  }
})

app.post('/api/doLogin', (req, res) => {
  let username = req.body.username
  ,password = req.body.password
  if(!username || !password) {
    res.json({status: 2, msg: '账号和密码不可为空'})
    return
  }
  db.find('users', {username: username}, {}, (err, result) => {
    if(err) {
      res.json({status: 2, msg: 'error when read db..'})
      console.log(err)
      return
    }
    if(result.length == 0) {
      res.json({status: 2, msg: '账号不存在，请更换账号'})
      return
    }
    let pwmd5 = md5(md5(password) + md5('loveSiky'))
    if(pwmd5 != result[0].password) {
      res.json({status: 2, msg: '密码输入错误'})
    }else {
      req.session.isLogin = 1
      req.session.username = username
      res.json({status: 1, msg: 'success'})
    }
  })
})

app.get('/logout', (req, res) => {
  req.session.isLogin = 0
  req.session.username = ''
  res.redirect('/')
})

app.listen(8080)
console.log('server created..')