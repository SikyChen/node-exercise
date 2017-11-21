const http = require('http')
      ,fs = require('fs')
      ,path = require('path')
      ,url = require('url')

// 从命令行参数获取root目录，默认为当前目录
const root = path.resolve(process.argv[2] || './http-server')
console.log('Static root dir: '+ root)

// 创建服务器
let server = http.createServer((req, res) => {
  console.log(req.method + ':' + req.url)
  // 获取请求的 url 的 path
  let pathname = url.parse(req.url).pathname
  if(pathname.includes('/api/')) {
    // ajax 数据接口
  }else {
    pathname = '/view' + pathname
  }
  // 拼接成对应的文件路径
  let filePath = path.join(root, pathname)
  // 获取文件状态
  fs.stat(filePath, (err, stats) => {
    if(!err && stats.isFile()) {
      console.log('>> 200' + req.url)
      res.writeHead(200)
      fs.createReadStream(filePath).pipe(res)
    }
    else if(!err && stats.isDirectory()) {
      fs.stat(filePath + 'index.html', (err, stats) => {
        if(!err && stats.isFile()) {
          console.log('>> 200' + req.url)
          res.writeHead(200)
          fs.createReadStream(filePath + 'index.html').pipe(res)
        }else {
          resErr(req, res)
        }
      })
    }else {
      resErr(req, res)
    }
  })
})

// 返回 404 响应
function resErr(req, res) {
  // 服务端控制台打印 404 信息
  console.log('>> 404' + req.url)
  res.writeHead(404)
  res.end('<h1>404 Not Found!</h1>')
}

server.listen(8047)

console.log('server create success!')
console.log('running at http://localhost:8047')
