const http = require('http')
,fs = require('fs')
,ejs = require('ejs')

http.createServer((req, res) => {
  if(req.url == '/') {
    fs.readFile(__dirname + '/views/index.ejs', (err, template) => {
      if(err) {
        throw Error('读取文件失败！')
      }else {
        template = template.toString()

        let d = {
          news: [
            {title: '油腻的师姐在哪里'}
            ,{title: '一刀9999'}
            ,{title: '今年过节不收礼，收礼只收脑白金'}
            ,{title: '准备好回到三国时代了吗'}
          ]
        }

        let html = ejs.render(template, d)
        res.writeHead(200, {'content-type': 'text/html; charset=utf-8'})
        res.end(html)
      }
    })
  }
}).listen(8080)

console.log('server created!')