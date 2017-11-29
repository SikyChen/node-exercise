const http = require('http')

http.createServer((req, res) => {
  console.log('收到请求：', req.url)

  res.writeHead(200, {'content-type': 'text/html; charset=utf-8'})
  
  res.write('<p>第一行回应</p>')
  res.write('<p>第二行回应</p>')
  res.write('<p>第三行回应</p>')
  res.write('<p>第四行回应</p>')
  res.write('<p>第五行回应</p>')

  res.end('<p>结束！</p>')
}).listen(8080)

console.log('服务启动成功！')