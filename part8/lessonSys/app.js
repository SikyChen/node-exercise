const express = require('express')
,bodyParser = require('body-parser')

,router = require('./router')
,db = require('./model/db')

,app = express()

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs')

app.get('/', router.showIndex)
app.get('/add', router.showAdd)
app.post('/doAdd', router.doAdd)
// app.get('/', router.showIndex)
// app.get('/', router.showIndex)

app.listen(8080)
console.log('>> server created..')