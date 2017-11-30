const fs = require('fs')

// cb 中返回 所有相册 array
exports.getAllAlbums = (cb) => {
  fs.readdir('./uploads', (err, files) => {
    if(err) {
      cb('没有找到 uploads 文件夹', null)
      return
    }
    let allAlbums = []
    ;(function iterator(i) {
      if(i == files.length) {
        cb(null, allAlbums)
        return
      }
      fs.stat('./uploads/' + files[i], (err, stats) => {
        if(err) {
          cb('找不到 ' + files[i] + ' 文件夹')
          return
        }
        if(stats.isDirectory) {
          allAlbums.push(files[i])
        }
        iterator(i+1)
      })
    })(0)
  })
}