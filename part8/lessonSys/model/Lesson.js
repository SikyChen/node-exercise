const mongoose = require('mongoose')

const lessonSchema = mongoose.Schema(
  {
    lid: String,
    name: String,
    students: [Number]
  }
)
.index({ lid: 1 })

lessonSchema.statics.addStudentsToLesson = function(lessonsArr, sid, cb) {
  for(var i=0; i<lessonsArr.length; i++) {
    Lesson.update({lid : lessonsArr[i]}, {$push : {students: sid}}, () => {
      console.log('课程添加报名学生成功')
      if(i == lessonsArr.length - 1) {
      }
    })
  }
  cb()
}

const Lesson = mongoose.model('Lesson', lessonSchema)

module.exports = Lesson