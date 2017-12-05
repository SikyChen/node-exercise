const express = require('express')
,MongoClient = require('mongodb').MongoClient
,app = express()

let dbURL = 'mongodb://localhost:27017/haha'

app.get('/', (req, res) => {
  MongoClient.connect(dbURL, (err, db) => {
    if(err) {
      console.log('连接数据库失败')
      return
    }
    console.log('连接数据库失成功')
    db.collection('users').insertOne({
      name: '哈哈'
      ,age: parseInt(Math.random()*100+10)
    }, (err, result) => {
      if(err) {
        db.close()
        console.log('插入数据失败，数据库已关闭')
        return
      }
      res.send(result)
      db.close()
      console.log('插入数据成功，数据库已关闭')
    })
  })
})

app.listen(8080)
console.log('server created..')