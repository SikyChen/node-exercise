const sd = require('silly-datetime')

var t = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss')

console.log(t)
console.log(typeof t)