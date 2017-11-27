
exports = {
  showIndex(req, res) {
    res.writeHead(200, {'content-type': 'text/html; charset=utf-8'})
    res.end('首页！')
  }

  ,showStudent(req, res) {
    let id = req.url.substr(9,6)
    res.writeHead(200, {'content-type': 'text/html; charset=utf-8'})
    res.end('我是学生页面' + id)
  }

  ,show404(req, res) {
    res.writeHead(200, {'content-type': 'text/html; charset=utf-8'})
    res.end('<h1>404</h1>')
  }
}