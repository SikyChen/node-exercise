const http = require('http')
,url = require('url')
,fs = require('fs')
,path = require('path')

let mime = null

let server = http.createServer((req, res) => {
  //这里如果不用req.url来if判断，那么用户不管输入什么网址，
  //做的事情都一样啊
  //得到地址
  let pathname = url.parse(req.url).pathname
  //判断此时用户输入的地址是文件夹地址还是文件地址
  //如果是文件夹地址，那么自动请求这个文件夹中的index.html
  if(pathname.indexOf('.') == -1) {
    pathname += '/index.html'
  }
  //输入的网址是127.0.0.1/images/logo.png
  //实际请求的是./static/images/logo.png
  var fileurl = "./" + path.normalize("./static/" + pathname);
  // 获取文件拓展名
  fs.readFile(fileurl, (err, data) => {
    if(err) {
      console.log('fail to read file ' + fileurl)
      res.writeHead(404, {'content-type': 'text/html; charset=utf-8'})
      res.end('<h1>404</h1><p>找不到该页面</p>')
      return
    }else {
      let extname = path.extname(fileurl)
      getMime(extname, mime => {
        res.writeHead(200, {'content-type': mime})
        res.end(data)
      })
    }
  })
})

server.listen(8080)

console.log('server created!')

function getMime(extname, cb) {
  if(mime) {
    cb(mime[extname] || 'text/plain')
    return
  }
  fs.readFile('./lib/mime.json', (err, data) => {
    if(err) throw Error('fail to read mime.json.')
    mime = JSON.parse(data)
    cb(mime[extname] || 'text/plain')
  })
}