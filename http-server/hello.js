let http = require('http')

let server = http.createServer((req, res) => {
  // 打印请求信息：请求方式（GET/POST等）: 请求url
  console.log(req.method + ':' + req.url)
  // 返回的请求头信息 200为成功
  res.writeHead(200, {'content-type': 'text/html'})
  res.write('<h1>Hello World!</h1>')
  res.end()
})

server.listen(8047)

console.log('server create success!')
console.log('running at http://localhost:8047')