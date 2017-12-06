const express = require('express')
,app = express()

,db = require('./model/db.js')

// 增
app.get('/api/insert', (req, res) => {
  let data = {
    name: ['小红', '小黄', '小杨'][parseInt(Math.random()*3)]
    ,age: parseInt(Math.random()*100 + 10)
  }
  db.insertOne('user1', data, (err, result) => {
    if(err) {
      console.log(err)
      console.log('插入数据失败')
      return
    }
    console.log('插入数据成功')
    res.send('插入数据成功')
  })
})

// 查
app.get('/api/find', (req, res) => {
  let page = req.query.page || 0
  ,pageSize = req.query.pageSize || 0

  db.find('user1', {}, { page: page, pageSize: pageSize }, (err, result) => {
    if(err) {
      console.log(err)
      console.log('查找数据失败')
      return
    }
    res.json({result : result})
    console.log('查找数据成功')
  })
})

// 删
app.get('/api/delete', (req, res) => {
  let target = {}
  if(req.query.name) {
    target.name = req.query.name
  }
  if(req.query.age) {
    target.age = {$gt:parseInt(req.query.age)}
  }
  db.deleteMany('user1', target, (err, result) => {
    if(err) {
      console.log(err)
      console.log('删除数据失败')
      return
    }
    res.send(result)
  })
})

// 改
app.get('/api/update', (req, res) => {
  db.updateMany(
    'user1'
    ,{
      name: '小黄'
    }
    ,{
      $set: {name: '小橘黄'}
    }
    ,(err, result) => {
      if(err) {
        console.log(err)
        console.log('修改数据失败')
        return
      }
      res.send(result)
    }
  )
})

app.listen(8080)
console.log('server created..')