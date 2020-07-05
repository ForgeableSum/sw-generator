var path = require('path')
var moby = require('moby')
var express = require('express')
var app = module.exports = express()

app.set('port', (process.env.PORT || 5000))
app.use(express.static(path.join(__dirname, '/public')))

app.use('/', express.static('public'))

app.get('/', function (req, res) {
    res.sendFile('/index.html');
})



if (!module.parent) {
  app.listen(app.get('port'), function () {
    console.log('Running at localhost:' + app.get('port'))
  })
}
