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
 * @param target Object 要插入的数据
 * @param callback(err, result) Function 回调
 * callback 返回两个参数
 * @param err 错误对象，若为null，则无错误
 * @param result 查找结果，若为null，则查找失败
 */
exports.insertOne = (collectionName, target, callback) => {
  __connetDB((err, db) => {
    if(err) {callback(err, null); return}
    db.collection(collectionName).insertOne(target, (err, result) => {
      callback(err, result)
      db.close()
    })
  })
}

/**
 * 查
 * @param collectionName string 要插入的集合
 * @param target Object 要插入的数据
 * @param rule Object 查找规则
 *        @param pageSize num 分页选项，单页数目
 *        @param page num 分页选项，页数
 *        @param sort Obj 排序方式
 * @param callback(err, result) Function 回调
 * callback 返回两个参数
 * @param err 错误对象，若为null，则无错误
 * @param result Arr 查找结果，若为null，则查找失败
 */
exports.find = (collectionName, target, rule, callback) => {
  if(!target) {
    console.log('db.find 参数错误')
    return
  }
  // 分页限制初始化
  let pageSize = parseInt(rule.pageSize || 0)
  ,page = parseInt(rule.page || 0) > 0 ? parseInt(rule.page) - 1 : 0
  ,sort = rule.sort || {}
  ,result = []
  __connetDB((err, db) => {
    if(err) {callback(err, null); return}
    // 查找目标
    let cursor = db.collection(collectionName).find(target)
      // 按分页查找
      .skip(page*pageSize).limit(pageSize)
      // 排序
      .sort(sort)
    // 查找完毕，放入 arr 数组
    cursor.each((err, doc) => {
      if(err) {
        callback(err, null)
        db.close()
        return
      }
      if(doc != null) {
        result.push(doc)
      }else {
        // 遍历结束
        callback(null, result)
        db.close()
      }
    })
  })
}

/**
 * 删
 */
exports.deleteMany = (collectionName, target, callback) => {
  __connetDB((err, db) => {
    if(err) {callback(err, null); return}
    db.collection(collectionName).deleteMany(target, (err, result) => {
      callback(err, result)
      db.close()
    })
  })
}

/**
 * 改
 */
exports.updateMany = (collectionName, target, target2, callback) => {
  __connetDB((err, db) => {
    if(err) {callback(err, null); return}
    db.collection(collectionName).updateMany(
      target, 
      target2, 
      (err, result) => {
        callback(err, result)
        db.close()
      }
    )
  })
}

/**
 * 获取总数目
 */
exports.getCount = (collectionName, callback) => {
  __connetDB((err, db) => {
    if(err) {callback(err, null); return}
    db.collection(collectionName).count({}).then(count => {
      callback(null, count)
      db.close()
    })
  })
}