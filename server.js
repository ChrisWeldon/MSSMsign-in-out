var url = require('url-parse');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


var students = {
  evansc: {
    name: "Chris Evans",
    signedIn: true,
    id:"evansc",
    timeOut: 0
  },
  perkinsj: {
    name: "Jackson Perkins",
    signedIn: false,
    id:"perkinsj",
    timeOut: 0
  },
  burckn:{
    name: "Noah Burck",
    signedIn: false,
    id:"burckn",
    timeOut: 0

  }
};

app.get("/listofnames", function(req, res){
  res.send(students);
});


app.post("/signIn", function(req,res){
  console.log("signOut POST Called!");
  console.log(req.body);
  console.log(req.body.student);
  students[req.body.student].signedIn = true;
  console.log(students);

});

app.post("/signOut", function(req,res){
  console.log("signOut POST Called!");
  students[req.body.student].timeOut = getTime();
  students[req.body.student].signedIn = false;

});

function getTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;


    return hour + ":" + min;

}

function getDate(){

  var date = new Date();

  var year = date.getFullYear();

  var month = date.getMonth() + 1;
  month = (month < 10 ? "0" : "") + month;

  var day  = date.getDate();
  day = (day < 10 ? "0" : "") + day;

  return year + ":" + month + ":" + day;

}


app.use(express.static('public'));

var server = app.listen(8081, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
});
