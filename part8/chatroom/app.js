const express = require('express')
,app = express()

// socket.io公式：
const server = require('http').createServer(app)
const io = require('socket.io')(server)

// session公式：
const session = require('express-session')
app.use(session({
  secret: 'keyword cat',
  resave: false,
  saveUninitialized: true
}))

// bodyParser公式：
const bodyParser = require('body-parser')
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs')
app.use(express.static('./public'))

app.get('/', (req, res) => {
  res.render('index')
})

// let users = []
app.post('/login', (req, res) => {
  let name = req.body.name
  if(!req.body.name) {
    res.json({
      status: -1,
      msg: '昵称不可为空'
    })
    return
  }
  // if(users.indexOf(name) > -1) {
  //   res.json({
  //     status: -1,
  //     msg: '昵称已经被占用'
  //   })
  //   return
  // }
  // users.push(name)
  req.session.name = name
  res.json({
    status: 1,
    msg: '登陆成功'
  })
})

app.get('/chat', (req, res) => {
  if(!req.session.name) {
    res.redirect('/')
    return
  }
  res.render('chat', {
    name : req.session.name
  })
})

io.on('connection', function(socket) {
  console.log('一个客户端已接入...')
  socket.on('send', req => {
    io.emit('reSend', {name: req.name, msg:req.msg})
  })
})

server.listen(8080)
console.log('server created..')