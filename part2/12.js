const http = require('http')
,fs = require('fs')
// 上传功能 包
,formidable = require('formidable')
,util = require('util')

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
    var form = new formidable.IncomingForm();
    
    form.uploadDir = "./uploads"
    form.parse(req, function(err, fields, files) {
      if(err) {
        throw Error('上传失败！')
      }
      console.log(util.inspect({fields: fields, files: files}))
      res.writeHead(200, {'content-type': 'text/plain; charset=utf-8'});
      res.write('received upload:');
      res.end('上传成功！');
    });
  }
}).listen(8080)

console.log('server created!')