const fs = require('fs')

// 打开一个读取流
let rs = fs.createReadStream('test.txt', { encoding: 'utf-8' })

rs.on('data', chunk => {
  console.log('DATA:')
  console.log(chunk)
})

rs.on('end', chunk => {
  console.log('END')
})

rs.on('error', error => {
  throw error
})

// 打开一个书写流
let ws1 = fs.createWriteStream('output3.txt', 'utf-8')

ws1.write('使用Stream写入文本数据...\n')
ws1.write('END.')
ws1.end()

let ws2 = fs.createWriteStream('output4.txt')
ws2.write(new Buffer('使用Stream写入二进制数据...\n', 'utf-8'))
ws2.write(new Buffer('END.', 'utf-8'))
ws2.end()

// 通过 读取流 的 pipe() 进行复制
let ws3 = fs.createWriteStream('output5.txt', 'utf-8')
ws3.write('下面的文字是从读取流通过pipe()传过来的\n----\n')
rs.pipe(ws3, {end: false})
rs.on('end', () => {
  ws3.end('\n----\n复制完毕！')
})