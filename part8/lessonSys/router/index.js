const Student = require('../model/Student')
,Lesson = require('../model/Lesson')

exports.showIndex = function(req, res, next) {
  Student.find({}, (err, result) => {
    if(err) {
      res.send('查询失败')
      return
    }
    res.render('index', {
      students: result
    })
  })
}

exports.showAdd = function(req, res, next) {
  res.render('add')
}

exports.doAdd = function(req, res, next) {
  console.log(req.body)
  Student.create(req.body, (err, result) => {
    console.log(result)
    if(err) {
      console.log('创建学生失败....')
      res.send('创建学生失败')
      return
    }
    Lesson.addStudentsToLesson(result.lessons, result.sid, () => {
      console.log('创建成功..')
      res.send('添加成功，<a href="/">返回首页</a>')
    })
  })
}