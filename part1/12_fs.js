const http = require('http')
,fs = require('fs')

http.createServer((req, res) => {
  if(req.url == '/favicon.ico') {return}
  fs.readdir('./album', (err, files) => {
    if(err) throw err
    console.log(`files: ${files}`)
    let dirs = [], txts = [], errFiles = []
    
    // 通过迭代器(递归)，异步转同步的方法
    ;(function iterator(i) {
      // 最后一次循环，结束循环并输出结果
      if(i == files.length) {
        console.log(`dirs: ${dirs}`)
        console.log(`txts: ${txts}`)
        return
      }
      fs.stat(`./album/${files[i]}`, (err, stats) => {
        if(err) throw err
        if(stats.isDirectory()) {
          dirs.push(files[i])
        }else if(stats.isFile()) {
          txts.push(files[i])
        }else {
          errFiles.push(files[i])
        }
        iterator(i+1)
      })
    })(0)
  })
  res.writeHead(200, {'content-type': 'text/html; charset=utf-8'})
  res.end()
}).listen(8080)

console.log('server created!')