const http = require('http')
,fs = require('fs')

http.createServer((req, res) => {
  if(req.url == '/') {
    res.writeHead(200, {'content-type': 'text/html; charset=utf-8'})
    res.end('<h1>Hello World!</h1>')
  }else if(req.url == '/fang') {
    fs.readFile('./test/aaa.html', (err, data) => {
      if(err) throw err
      res.writeHead(200, {'content-type': 'text/html; charset=utf-8'})
      res.end(data)
    })
  }else if(req.url == '/yuan') {
    fs.readFile('./test/bbb.html', (err, data) => {
      if(err) throw err
      res.writeHead(200, {'content-type': 'text/html; charset=utf-8'})
      res.end(data)
    })
  }else if(req.url == '/0.jpg'){
    fs.readFile('./test/0.jpg', (err, data) => {
      if(err) throw err
      res.writeHead(200, {'content-type': 'image/jpg'})
      res.end(data)
    })
  }else if(req.url == '/aaa.css'){
    fs.readFile('./test/aaa.css', (err, data) => {
      if(err) throw err
      res.writeHead(200, {'content-type': 'text/css; charset=utf-8'})
      res.end(data)
    })
  }else {
    fs.readFile('./static/404.html', (err, data) => {
      if(err) throw err
      res.writeHead(404, {'content-type': 'text/html; charset=utf-8'})
      res.end(data)
    })
  }
}).listen(8080)

console.log('服务器开启成功！')