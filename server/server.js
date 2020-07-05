var path = require('path')
var express = require('express')
var app = module.exports = express()
var crawlGen = require("./gen-crawl.js");


app.set('port', (process.env.PORT || 5000))
app.use(express.static(path.join(__dirname, '/public')))

app.use('/', express.static('public'))

app.get('/', function (req, res) {
    res.sendFile('/index.html');
})


app.get('/spin-text', function (req, res) {
    res.send(crawlGen.getOpeningCrawlText());
})


if (!module.parent) {
    app.listen(app.get('port'), function () {
        console.log('Running at localhost:' + app.get('port'))
    })
}

