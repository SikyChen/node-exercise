const http = require('http')

http.createServer((req, res) => {
  console.log('request:', req.url)

  if(req.url == '/') {
    res.writeHead(200, {'content-type': 'text/html; charset=utf-8'})
    res.end('成功！')
  }else {
    res.writeHead(404, {'content-type': 'text/html; charset=utf-8'})
    res.end('失败！')
  }
}).listen(8080)

console.log('server created!')