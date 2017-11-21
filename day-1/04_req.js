const http = require('http')

http.createServer((req, res) => {
  console.log(req.url)
  res.end()
}).listen(8080)