'use strict'

const fs = require('fs')

// 准备写入的数据
let data = '假装另一篇很长的文章~\r\n'
data += '真的挺长的~\r\n'

fs.writeFile('./outPut.txt', data, err => {
  if(err) {
    console.log(err)
  }else {
    console.log('写入成功11！')
    console.log('----')
  }
})

// 准备写入的数据，类型为buffer
let buf = Buffer.from('假装是一篇很长的文章，变成buffer了2222').toString('utf-8')

let outPut2
try {
  outPut2 = fs.openSync('./outPut2.txt', 'r+')
} catch (error) {
  throw error
}

fs.write(outPut2, buf, err => {
  if(err) {
    console.log(err)
  }else {
    console.log('----\r\n')
    console.log('又写入成功-buffer！')
    console.log('----')
  }
})