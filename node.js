var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));
app.set('port', (process.env.PORT || 5000))

app.get('/', function(req, res) {
  res.sendFile('index.html');
});

app.listen(app.get('port'), function() {
  console.log('listening on: ' + app.get('port'));
});

