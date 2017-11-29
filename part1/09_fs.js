const http  = require('http')  ,
      fs    = require('fs')

http.createServer((req, res) => {
  if(req.url == '/favicon.ico') {return}
  res.writeHead(200, {'content-type': 'text/html; charset=utf-8'})
  let userId = parseInt(Math.random() * 89999) + 10000
  fs.mkdir('./test'+userId, err => {
    if(err) throw err
    res.end()
  })
}).listen(8080)

console.log('Server Created!')