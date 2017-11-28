
const http = require('http')
,fs = require('fs')
,ejs = require('ejs')
,formidable = require('formidable')
,sillyDatetime = require('silly-datetime')
,path = require('path')

let server = http.createServer((req, res) => {
  // 进入 管理后台
  if(req.url == '/admin') {
    fs.readFile(__dirname + '/views/admin.ejs', (err, data) => {
      if(err) {
        throw Error('读取 admin.ejs 文件失败')
      }else {
        let template = data.toString()
        
        let d = {albums:[]}
        fs.readdir(__dirname + '/uploads', (err, files) => {
          if(err) {
            fs.mkdir(__dirname + '/uploads', err => {
              if(err) {
                throw Error('创建 uploads 文件夹失败！')
              }
            })
          }else {
            d.albums = files
          }
          let html = ejs.render(template, d)
          res.writeHead(200, {'content-type': 'text/html; charset=utf-8'})
          res.end(html)
        })
      }
    })
    return
  }
  // 创建 相册
  if(req.url == '/admin/mkdir' && req.method.toLowerCase() == 'post') {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
      if(err) {
        throw Error('创建文件夹失败！')
      }
      if(fields.name == 'admin') {
        res.writeHead(200, {'content-type': 'text/html; charset=utf-8'})
        res.write('创建失败，' + fields.name + ' 不可用<br>')
        res.end('<a href="/admin">点击返回</a>')
      }
      fs.readdir(__dirname + '/uploads/' + fields.name, (err, files) => {
        if(err) {
          fs.mkdir(__dirname + '/uploads/' + fields.name)
          res.writeHead(200, {'content-type': 'text/html; charset=utf-8'})
          res.write(fields.name + ' 创建成功<br>')
          res.end('<a href="/admin">点击返回</a>')
        }else {
          res.writeHead(200, {'content-type': 'text/html; charset=utf-8'})
          res.write('创建失败，已存在 ' + fields.name + '<br>')
          res.end('<a href="/admin">点击返回</a>')
        }
      })
    });
    return
  }
  // 上传图片
  let tTemp = '', num = 0
  if(req.url == '/admin/uploadPhoto' && req.method.toLowerCase() == 'post') {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
      if(err) {
        throw Error('上传图片失败！')
      }
      console.log(fields)
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
      let newpath = `uploads/${fields.album}/${t}${ran}${extname}`
      fs.rename(files.tupian.path, newpath, err => {
        if(err) {
          throw Error('改名失败！')
        }
        res.writeHead(200, {'content-type': 'text/plain; charset=utf-8'});
        res.end('上传图片成功！');
      })
    });
    return
  }

  // 进入 相册
  if(req.url == '/') {
    fs.readFile(__dirname + '/views/albumlist.ejs', (err, data) => {
      if(err) {
        throw Error('读取 album.ejs 文件失败')
      }else {
        let template = data.toString()
        
        let d = {albums:[]}
        fs.readdir(__dirname + '/uploads', (err, files) => {
          if(err) {
            fs.mkdir(__dirname + '/uploads', err => {
              if(err) {
                throw Error('创建 uploads 文件夹失败！')
              }
            })
          }else {
            d.albums = files
          }
          let html = ejs.render(template, d)
          res.writeHead(200, {'content-type': 'text/html; charset=utf-8'})
          res.end(html)
        })
      }
    })
    return
  }

  if(req.url.substr(0,8) == '/albums/') {
    // 检验是否有对应相册
    fs.readdir(__dirname + '/uploads', (err, files) => {
      if(err) {
        throw Error('读取 uploads 文件夹失败！')
      }
      let isDir = false
      for(var i=0; i<files.length; i++) {
        if(files[i] == req.url.substr(1)) {
          isDir = true
        }
      }
      if(isDir) {
        fs.readdir(__dirname + '/uploads' + req.url, (err, files) => {
          if(err) {
            throw Error('读取 '+req.url+' 文件夹失败！')
          }
          let d = {name: req.url.substr(1),photos: []}
          for(var i=0; i<files.length; i++) {
            d.photos.push({name:files[i], src: '/uploads/' + files[i]})
          }
          fs.readFile(__dirname + '/views/album.ejs', (err, data) => {
            let template = data.toString()
            let html = ejs.render(template, d)
            res.writeHead(200, {'content-type': 'text/html; charset=utf-8'})
            res.end(html)
          })
        })
      }else {
        res.writeHead(404, {'content-type': 'text/html; charset=utf-8'})
        res.end('<h2>404</h2>')
      }
    })
    return
  }

})

server.listen(8080)

console.log('server created...')