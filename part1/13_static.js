const http = require('http')
,fs = require('fs')
,url = require('url')
,path = require('path')

http.createServer((req, res) => {
  if(req.url == '/favicon.ico') {return}
  console.log('request: ', req.url)

  let pathname = url.parse(req.url).pathname
  if(pathname === '/') {
    pathname = 'index.html'
  }
  let extname = path.extname(pathname)
  console.log(pathname, extname)

  fs.readFile(`./static/${pathname}`, (err, data) => {
    if(err) {
      fs.readFile('./static/404.html', (err, data) => {
        res.writeHead(404,{'content-type': 'text/html; charset=utf-8'})
        if(err) {
          res.write('<h2>404</h2>')
          res.end('<p>连404页面都找不到了，555~</p>')
        }else {
          res.end(data)
        }
      })
    }else {
      
      let mime = getMime(extname)
      res.writeHead(200, {'content-type': mime})
      res.end(data)
    }
  })
}).listen(8080)

console.log('server created!')

function getMime(extname) {
  switch (extname) {
    case ".html" :
      return "text/html";
      break;
    case ".jpg" : 
      return "image/jpg";
      break;
    case ".css":
      return "text/css";
      break;
  }
}