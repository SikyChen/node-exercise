const express = require('express')
,bodyParser = require('body-parser')


let app = express()

let router = require('./controller/router.js')

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs')

app.use(express.static('./public'))
app.use(express.static("./uploads"));

// 进入首页 相册列表
app.get('/', router.showIndex)
// 进入相册 图片列表
app.get('/album/:albumName', router.showAlbum)

// 进入管理界面 上传图片
app.get('/admin', router.showAdmin)

// 上传图片
app.post('/upimage', router.upImage)

// 创建相册
app.get('/createAlbum', router.showCreateAlbum)
app.post('/createAlbum', router.createAlbum)

app.use((req, res) => {
  res.render('404')
})

app.listen(8080)
console.log('server created..')