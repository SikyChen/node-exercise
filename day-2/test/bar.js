// 模块内部的路径，也用相对路径
// 若不带 './' 则寻找 node_modules 文件夹

let foo = require('./foo.js')

exports.msg = foo.msg