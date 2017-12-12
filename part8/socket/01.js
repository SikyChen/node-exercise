const http = require('http')
,fs = require('fs')

const server = http.createServer((req, res) => {
  // if(req.url == '/') {
    fs.readFile('./index.html', (err, data) => {
      if(err) {
        console.log(err)
        res.end('error')
        return
      }
      res.writeHead(200, {'content-type': 'text/html; charset=utf-8'})
      res.end(data)
    })
  // }
})

// 创建一个io对象
const io = require('socket.io')(server)
// 监听连接事件
io.on('connection', socket => {
  console.log('一个新客户端已接入')
  // 服务端监听 hi 事件，并接收 result 数据，触发回调
  socket.on('hi', result => {
    console.log('>> hi: ', result.msg)
    // 触发事件 rehi ，并传送数据
    socket.emit('rehi', {msg: "恩恩，早上好"})
  })

  socket.on('sayHiToEveryone', result => {
    console.log('>> sayHiToEveryone: ', result.msg)
    // 广播
    io.emit('broadcast', {msg: '有人对大家说：' + result.msg + new Date})
  })
})

server.listen(8080)
console.log('server created..')