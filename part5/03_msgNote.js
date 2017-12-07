const express = require('express')
,bodyParser = require('body-parser')
,db = require('./model/db.js')
,sd = require('silly-datetime')

,app = express()

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs')

app.use(express.static('./public'))

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/api/getMsg', (req, res) => {
  db.find('msgnote', 
    {}, 
    {
      page: req.query.page,
      pageSize: req.query.pageSize,
      sort: {createTime: -1}
    }, 
    (err, result) => {
      if(err) {
        console.log(err)
        console.log('读取数据失败')
        return
      }
      db.getCount('msgnote', (err, count) => {
        if(err) {
          console.log(err)
          console.log('读取计数失败')
          res.json({status: 2})
          return
        }
        res.json({
          status: 1,
          data: result,
          total: count,
          page: parseInt(req.query.page),
          pageSize: parseInt(req.query.pageSize),
          pages: Math.ceil(count/req.query.pageSize)
        })
      })
    }
  )
})

app.get('/api/delete', (req, res) => {
  db.deleteMany('msgnote', {
    timeStamp: req.query.timeStamp
  }, (err, result) => {
    if(err) {
      console.log(err)
      console.log('删除数据失败')
      res.json({status: 2})
      return
    }
    res.json({status: 1})
  })
})

app.post('/api/submit', (req, res) => {
  db.insertOne('msgnote', {
    username: req.body.username,
    content: req.body.content,
    createTime: sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
    timeStamp: new Date().getTime().toString()
  }, (err, result) => {
    if(err) {
      console.log(err)
      console.log('插入数据失败')
      res.json({status: 2})
      return
    }
    res.json({status: 1})
  })
})

app.listen(8080)
console.log('server created..')