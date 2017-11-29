const http = require('http')
,fs = require('fs')
,util = require('util')
,sillyDatetime = require('silly-datetime')
,path = require('path')
// 上传功能 包
,formidable = require('formidable')

let tTemp = '', num = 0

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
      // 时间
      let t = sillyDatetime.format(new Date(), "YYYYMMDDHHmmss")
      // 编号
      if(!tTemp) {
        tTemp = t
      }else if(tTemp != t) {
        num = 0
      }else if(tTemp == t) {
        num += 1
      }
      let ran = ('0000' + num).substr(-5)
      // 后缀名
      let extname = path.extname(files.tupian.name)
      let newpath = 'uploads/' + t + '_' + ran + extname
      fs.rename(files.tupian.path, newpath, err => {
        if(err) {
          throw Error('改名失败！')
        }
        res.writeHead(200, {'content-type': 'text/plain; charset=utf-8'});
        res.end('上传成功！');
      })
    });
  }
}).listen(8080)

console.log('server created!')