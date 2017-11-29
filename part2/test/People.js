// 当作为一个类暴露的时候，需要用的 module.exports

function People(name, sex, age) {
  this.name = name
  this.sex  = sex
  this.age  = age
}

People.prototype = {
  sayHello() {
    console.log(this.name)
    console.log(this.sex)
    console.log(this.age)
  }
}

module.exports = People