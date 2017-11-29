const http = require('http')

http.createServer((req, res) => {
  console.log(`request: ${req.url}`)
  let userurl = req.url

  res.writeHead(200, {'content-type': 'text/html; charset=utf-8'})
  if(userurl.substr(0, 9) == '/student/') {
    let studentid = userurl.substr(9)
    if(/^\d{10}$/.test(studentid)) {
      res.end(`您所查询的学生信息，id为${studentid}`)
    }else {
      res.end(`请输入正确的学生学号`)
    }
  }else if(userurl.substr(0, 9) == '/teacher/') {
    let teacherid = userurl.substr(9)
    if(/^\d{6}$/.test(teacherid)) {
      res.end(`您所查询的老师信息，id为${teacherid}`)
    }else {
      res.end(`请输入正确的老师工号`)
    }
  }else {
    res.end(`请检查url`)
  }

}).listen(8080)

console.log('服务启动成功！')