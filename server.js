var path = require('path')
var thesaurus = require("thesaurus");
var express = require('express')
var app = module.exports = express()


app.set('port', (process.env.PORT || 5000))
app.use(express.static(path.join(__dirname, '/public')))

app.use('/', express.static('public'))

app.get('/', function (req, res) {
    res.sendFile('/index.html');
})


app.post('/spin-text', function (req, res) {

    var body = "";

    req.on('data', function (chunk) {
        body += chunk;
    });
    req.on('end', function () {
      //  console.log('POSTed: ' + body);
        body = thesaurus.find(body); 
        res.send(body);

    });
})

if (!module.parent) {
    app.listen(app.get('port'), function () {
        console.log('Running at localhost:' + app.get('port'))
    })
}
