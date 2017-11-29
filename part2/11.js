const http = require('http')
,querystring = require('querystring')
,fs = require('fs')

http.createServer((req, res) => {
  if(req.url == '/') {
    fs.readFile(__dirname + '/form.html', (err, data) => {
      if(err) {
        throw Error('读取 form.html 文件失败！')
      }else {
        res.writeHead(200, {'content-type': 'text/html; charset=utf-8'})
        res.end(data)
      }
    })
  }else if(req.url == '/dopost' && req.method.toLowerCase() == 'post') {
    let postData = ''
    req.addListener('data', chunk => {
      postData += chunk
    })
    req.addListener('end', () => {
      let postDataString = postData.toString()
      
      res.writeHead(200, {'content-type': 'text/html; charset=utf-8'})
      res.end('success')

      let postDataObj = querystring.parse(postDataString)
      console.log('postDataObj:', postDataObj)
      console.log('postDataObj.name:', postDataObj.name)
      console.log('postDataObj.sex:', postDataObj.sex)
    })
  }
}).listen(8080)

console.log('server created!')