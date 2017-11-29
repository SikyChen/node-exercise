
const ejs = require('ejs')

// 模板
let template = `it's a good day today, i have bought an iphone<%= num %>`

// 数据
let data = {
  num: 'X'
}

// 数据绑定
let html = ejs.render(template, data)

// 输出
console.log(html)