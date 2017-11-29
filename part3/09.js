const express = require('express')
,fs = require('fs')

const app = express()

app.use(staticServer)

app.get('/admin', (req, res) => {
  res.send('管理员')
})

app.use('/', (req, res) => {
  res.send(404, '<h2>404 Not Found!</h2>')
})

app.listen(8080)
console.log('server created..')

function staticServer(req, res, next) {
  let filePath = req.originalUrl
  // 根据网址读取 public 中的文件
  // 如果有该文件，则渲染该文件
  // 如果没有文件，则next()
  fs.readFile('./public' + filePath, (err, data) => {
    if (err) {
      next()
      return
    }
    // 此处没有定义 mime 类型
    res.send(data.toString())
  })
}