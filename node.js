var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.listen(process.env.PORT || 3000);

app.get('/', function(req, res) {
  res.sendFile('index.html');
});