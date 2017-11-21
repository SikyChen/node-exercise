const http = require('http')
const url = require('url')
const fs = require('fs')

http.createServer((req, res) => {

  let pathname = url.parse(req.url).pathname
  console.log('url:', pathname)
  pathname = pathname === '/' ? '/index.html' : pathname

  fs.readFile('./static/' + pathname, (err, data) => {
    if(err) {
      fs.readFile('./static/404.html', (err, data404) => {
        res.writeHead(404, {'content-type': 'text/html', 'chartset': 'utf-8'})
        res.end(data404)
      })
      return
    }
    res.end(data)
  })
  
}).listen(5268, 'localhost')

console.log('服务器开启成功...')