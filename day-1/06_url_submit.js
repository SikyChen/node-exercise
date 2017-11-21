const http = require('http')
,fs = require('fs')
,url = require('url')

http.createServer((req, res) => {
  if(req.url == '/') {
    fs.readFile('./test/form.html', (err, data) => {
      if(err) throw err
      res.writeHead(200, {'content-type': 'text/html; charset=utf-8'})
      res.end(data)
    })
  }else {
    let query = url.parse(req.url, true).query
    ,name = query.name
    ,age = query.age
    ,sex = query.sex

    res.writeHead(200, {'content-type': 'text/html; charset=utf-8'})
    let subData = '姓名：' + name + '；年龄：' + age + '；性别：' + sex
    res.end(subData)
  }
}).listen(8080)