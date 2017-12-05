// 封装对数据库的 增删改查 操作
const MongoClient = require('mongodb').MongoClient
,settings = require('../settings.js')

// 任何数据库操作，都要先连接数据库
function __connetDB(callback) {
  MongoClient.connect(settings.dburl, (err, db) => {
    callback(err, db)
  })
}

/**
 * 增
 * @param collectionName string 要插入的集合
 * @param data JSON/Object 要插入的数据
 * @param callback Function 回调
 */
exports.insertOne = (collectionName, data, callback) => {
  __connetDB((err, db) => {
    if(err) {callback(err, null); return}
    db.collection(collectionName).insertOne(data, (err, result) => {
      callback(err, result)
      db.close()
    })
  })
}
