'use strict'

const fs = require('fs')

// 异步读取文件
fs.readFile('./test.txt', 'utf-8', (err, data) => {
  console.log('异步读取：')
  if(err) {
    console.log(err)
  }else {
    console.log(data)
    // 将string转换成buffer对象
    let buf = Buffer.from(data)
    console.log('string to buffer:', buf)
    console.log('----')
  }
})

// 异步读取二进制文件
fs.readFile('./timg2.png', (err, data) => {
  if(err) {
    console.log(err)
  }else {
    console.log(data)
    console.log(data.length + 'bytes')
    // 将buffer对象转换成string
    // let text = data.toString('utf-8')
    // console.log(text)
    console.log('----')
  }
})

// 同步读取文件
console.log('同步读取：')
try {
  var dataSync = fs.readFileSync('./test.txt', 'utf-8')
  console.log(dataSync)
} catch (error) {
  console.log(error)
}
console.log('----')

// 同步读取文件错误模拟
console.log('同步读取错误模拟：')
try {
  var dataSync = fs.readFileSync('./test1.txt', 'utf-8')
  console.log(dataSync)
} catch (error) {
  console.log(error)
}
console.log('----')
