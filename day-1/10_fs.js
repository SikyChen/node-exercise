const http = require('http')
,fs = require('fs')

http.createServer((req, res) => {
  if(req.url == '/favicon.ico') {return}
  res.writeHead(200, {'content-type': 'text/html; charset=utf-8'})
  fs.stat('./案例清单.txt', (err, stats) => {
    if(err) throw err
    console.log('isDirectory? ', stats.isDirectory())
    console.log('isFile? ', stats.isFile())
  })
  res.end()
}).listen(8080)

console.log('Server Created!')