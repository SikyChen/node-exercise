const http = require('http')
,fs = require('fs')

http.createServer((req, res) => {
  if(req.url == '/favicon.ico') {return}
  res.writeHead(200, {'content-type': 'text/html; charset=utf-8'})
  fs.readdir('./album', (err, files) => {
    if(err) throw err
    console.log(`files: ${files}`)
    let dirs = [], txts = []
    // 下面的 for 循环，可以使用是因为 let 使得 i 的值唯一
    // 不过这种方法，依然可能会有问题
    // 最后一次循环并输出的时候，有可能前面的还没读取完成，所以导致输出的数据不完整
    // 还是用 12_fs.js 中 异步变同步的方法 更好
    for(let i=0; i<files.length; i++) {
      fs.stat(`./album/${files[i]}`, (err, stats) => {
        if(stats.isDirectory()) {
          dirs.push(files[i])
        }else if(stats.isFile()) {
          txts.push(files[i])
        }
        if(i == files.length -1) {
          console.log(files[i])
          console.log(`dirs: ${dirs}`)
          console.log(`txts: ${txts}`)
          console.log('----------')
          res.end()
        }
      })
    }
  })
}).listen(8080)

console.log('server created!')