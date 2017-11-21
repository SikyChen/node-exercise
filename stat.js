const fs = require('fs')

fs.stat('./test.txt', (err, stat) => {
  if(err) {
    console.log(err)
  }else {
    console.log(stat)
    // 是否是文件
    console.log('isFile:', stat.isFile())
    // 是否是目录（文件夹）
    console.log('isDirectory', stat.isDirectory())
    if(stat.isFile()) {
      console.log('size:', stat.size)
      console.log('birth time:', stat.birthtime)
      console.log('modified time:', stat.mtime)
    }
  }
})
