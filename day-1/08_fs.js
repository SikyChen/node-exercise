const http = require('http')
const fs = require('fs')

http.createServer((req, res) => {
  if(req.url == '/favicon.ico') {return}
  let userId = parseInt(Math.random() * 89999) + 10000
  console.log(`欢迎${userId}`)

  res.writeHead(200, {'content-type': 'text/html; charset=utf-8'})

  fs.readFile('./案例清单.txt', (err, data) => {
    if(err) throw err
    console.log(`${userId}:文件读取完毕！`)
    res.end(data)
  })
}).listen(8080)

console.log('服务开启成功！')