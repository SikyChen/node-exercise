const fs = require('fs')
,gm = require('gm')

gm('./img.jpg')
  .crop(100,110,120,130)
  .write('./img3.jpg', err => {
    if(err) {
      throw err
    }
    console.log('裁切成功！')
  })