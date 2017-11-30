const fs = require('fs')
,formidable = require('formidable')
,sillyDatetime = require("silly-datetime")
,path = require('path')

const file = require('../models/file.js')


exports.showIndex = (req, res, next) => {
  res.render('index')
}

exports.showAdmin = (req, res, next) => {
  file.getAllAlbums((err, allAlbums) => {
    if(err) {
      console.log(err)
      next()
      return
    }
    res.render('admin', {
      allAlbums: allAlbums
      ,status: 0
    })
  })
}

exports.showCreateAlbum = (req, res, next) => {
  res.render('createAlbum', {
    error: 0
    ,status: 0
  })
}

exports.createAlbum = (req, res, next) => {
  if(req.body.albumName == '') {
    res.render('createAlbum', {
      error: 1  // 相册名为空
      ,status: 0
    })
    return
  }
  file.getAllAlbums((err, allAlbums) => {
    if(err) {
      console.log(err)
      next()
      return
    }
    let hasAlbum = false
    for(let i=0;i<allAlbums.length;i++) {
      if(allAlbums[i] == req.body.albumName) {
        hasAlbum = true
        break
      }
    }
    if(hasAlbum) {
      res.render('createAlbum', {
        error: 2  // 相册名已存在
        ,status: 0
      })
      return
    }else {
      fs.mkdir(__dirname + '/../uploads/' + req.body.albumName, err => {
        if(err) {
          console.log('创建文件夹 ' + req.body.albumName + ' 失败')
          res.send('创建文件夹失败')
          return
        }else {
          res.send('创建成功..<br><a href="/admin">点击返回</a>')
          res.render('createAlbum', {
            error: 0  // 相册名为空
            ,status: 1  // 创建成功
          })
          return
        }
      })
    }
  })
}

exports.upImage = (req, res, next) => {
  this.tTemp = 0
  this.num = 0

  // 如果相册存在，则上传图片
  var form = new formidable.IncomingForm();
  form.uploadDir = __dirname + "/../temp"
  form.parse(req, (err, fields, files) => {
    if(err) {
      consle.log('上传图片失败！')
      next()
      return
    }
    if(fields.albumName == '') {
      file.getAllAlbums((err, allAlbums) => {
        if(err) {
          console.log(err)
          next()
          return
        }
        res.render('admin', {
          allAlbums: allAlbums
          ,status: 2
        })
        console.log('未选择文件夹！')
      })
      return
    }
    file.getAllAlbums((err, allAlbums) => {
      if(err) {
        console.log(err)
        next()
        return
      }
      let hasAlbum = false
      for(let i=0;i<allAlbums.length;i++) {
        if(allAlbums[i] == fields.albumName) {
          hasAlbum = true
          break
        }
      }
      if(!hasAlbum) {
        file.getAllAlbums((err, allAlbums) => {
          if(err) {
            console.log(err)
            next()
            return
          }
          res.render('admin', {
            allAlbums: allAlbums
            ,status: 2
          })
          console.log('文件夹不存在！')
        })
        return
      }else {
        // 如果文件夹存在，则保存文件夹
        // 时间
        let t = sillyDatetime.format(new Date(), "YYYYMMDDHHmmss")
        // 编号
        if(!this.tTemp) {
          this.tTemp = t
        }else if(this.tTemp != t) {
          this.num = 0
        }else if(this.tTemp == t) {
          this.num += 1
        }
        let ran = ('0000' + this.num).substr(-5)
        // 后缀名
        let extname = path.extname(files.upImage.name)
        let newpath = `${__dirname}/../uploads/${fields.albumName}/${t}${ran}${extname}`
        // rename 方法，旧 path 可以直接用图片 .path
        // 新 path 最好用相对路径，从 __dirname 找到对应文件夹
        fs.rename(files.upImage.path, newpath, err => {
          if(err) {
            console.log('改名失败！')
            file.getAllAlbums((err, allAlbums) => {
              if(err) {
                console.log(err)
                next()
                return
              }
              res.render('admin', {
                allAlbums: allAlbums
                ,status: 2
              })
              console.log('改名失败')
            })
            return
          }
          file.getAllAlbums((err, allAlbums) => {
            if(err) {
              console.log(err)
              next()
              return
            }
            res.render('admin', {
              allAlbums: allAlbums
              ,status: 1
            })
            console.log('上传图片成功！')
          })
        })
      }
    })
  });

}