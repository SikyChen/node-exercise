const http = require('http')

http.createServer((req, res) => {
  res.writeHead(200, {'content-type': 'text/html; charset=utf-8'})
  res.end('<h1>Hello World!</h1>')
}).listen(8080)

console.log('服务器开启成功！')