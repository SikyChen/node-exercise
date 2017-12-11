const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/lessonSys')

const db = mongoose.connection
db.once('open', cb => {
  console.log('>> db has been connected..')
})

module.exports = db