const http = require('http')

http.createServer((req, res) => {
  console.log('request:', req.url)

  res.writeHead(200, {'content-type': 'text/html; charset=utf-8'})
  res.write('<ul>')
  res.write('<li>hello</li>')
  res.write('<li>world</li>')
  res.write('<li>hello</li>')
  res.write('<li>siky</li>')
  res.write('</ul>')
  res.end('成功！')
}).listen(8080)

console.log('server created!')