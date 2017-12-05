const express = require('express')
,app = express()

,db = require('./model/db.js')

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
    res.send('插入数据成功')
  })
})

app.listen(8080)
console.log('server created..')