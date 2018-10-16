const app = require('express')()

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(8000)
