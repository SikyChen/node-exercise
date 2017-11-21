const http = require('http')
,url = require('url')

http.createServer((req, res) => {
  console.log(req.url)

  console.log(url.parse(req.url))

  console.log(url.parse(req.url).query)

  console.log(url.parse(req.url, true).query.b)

  res.end()
}).listen(8080)