var express = require('express');
var app = express();

var students = {
  chris: {
    name: "Chris Evans",
    sign: true
  },
  jackson: {
    name: "Jackson Perkins",
    sign: false
  },
  noah:{
    name: "Noah Burck",
    sign: false
  }
}

app.get("/listofnames", function(req, res){
  res.send(students);
});

app.get("/listofnames/:student", function(req, res){
  res.send(students[req.params.student]);
});

app.use(express.static('public'));

var server = app.listen(8081, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
});
