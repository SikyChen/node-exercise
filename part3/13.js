const express = require('express')
,app = express()
,bodyParser = require('body-parser')

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('form')
})

app.post('/', (req, res) => {
  console.log(req.body)
  res.json(req.body)
})

app.listen(8080)