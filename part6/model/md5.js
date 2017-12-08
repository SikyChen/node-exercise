const crypto = require('crypto')

module.exports = str => {
  let md5 = crypto.createHash('md5')
  return md5.update(str).digest('base64')
}