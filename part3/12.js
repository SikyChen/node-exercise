const express = require('express')
,app = express()

app.get('/', (req, res) => {
  console.log(req.query)
  console.log(req.query.aaa)
  res.send('success')
})

app.listen(8080)