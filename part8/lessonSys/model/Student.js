const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema(
  {
    sid: String,
    name: String,
    sex: String,
    age: Number,
    lessons: [String]
  }
)
.index({sid: 1})

const Student = mongoose.model('Student', studentSchema)

module.exports = Student