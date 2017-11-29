// 如果 require 的时候，路径不加 "./"，则会到 node_moduels 中查找并引用

const foo = require('foo.js')

console.log('msg: ', foo.msg)

foo.showMsg()