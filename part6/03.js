const fs = require('fs')
,gm = require('gm')

gm('./img.jpg')
  .resize(50,50)
  .write('./img2.jpg', (err) => {
    if(err) {
      console.log(err)
    }
    console.log('修改成功！')
  })