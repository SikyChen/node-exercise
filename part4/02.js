const express = require('express')
,MongoClient = require('mongodb').MongoClient
,assert = require('assert')

,app = express()

app.set('view engine', 'ejs')

let dbURL = 'mongodb://localhost:27017/student'

app.get('/', (req, res) => {
  MongoClient.connect(dbURL, (err, db) => {
    if(err) {
      console.log('连接数据库失败')
      return
    }
    console.log('数据库连接成功')
    let data = []
    let cursor = db.collection('student').find( )
    cursor.each((err, doc) => {
      if(err) {
        console.log('游标遍历错误')
        return
      }
      if(doc != null) {
        data.push(doc)
      }else {
        console.log('数据库读取完毕')
        db.close()
        console.log('数据库已关闭')
        res.render('index', {
          data: data
        })
      }
    })
  })
})

app.get('/add', (req, res) => {
  res.render('add')
})

app.get('/submit', (req, res) => {
  MongoClient.connect(dbURL, (err, db) => {
    if(err) {
      console.log('数据库连接失败')
      return
    }
    console.log('数据库连接成功')
    db.collection('student').insertOne({
      name: req.query.name
      ,age: req.query.age
      ,score: {
        yuwen: req.query.yuwen
        ,shuxue: req.query.shuxue
      }
    }, (err, result) => {
      if(err) {
        console.log('数据库写入失败')
        return
      }
      res.send('数据写入成功，<a href="/">点击返回</a>')
      db.close()
      console.log('数据库已关闭')
    })
  })
})

app.listen(8080)
console.log('server created..')