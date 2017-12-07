const crypto = require('crypto')

console.log("123456")
console.log(md5("123456"))

function md5(str) {
  let md5 = crypto.createHash('md5')
  return md5.update(str).digest('base64')
}