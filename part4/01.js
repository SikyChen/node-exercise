const express = require('express')
,MongoClient = require('mongodb').MongoClient
,assert = require('assert')
,app = express()

,dbURL = 'mongodb://localhost:27017/itcast'

app.get('/', (req, res) => {
  // 连接数据库，异步操作
  MongoClient.connect(dbURL, (err, db) => {
    if(err) {
      res.send('数据库连接失败')
      return
    }
    res.set('Content-Type', 'text/html; charset=utf-8');
    res.write("恭喜，数据库已经成功连接<br>");
    db.collection('user').insertOne({'name': 'siky'}, (err, result) => {
      if(err) {
        res.send('数据库写入失败')
        return
      }
      res.write("恭喜，数据已经成功插入");
      res.end();
      // 关闭数据库
      db.close()
    })
  })
})

app.listen(8080)
console.log('server created..')
