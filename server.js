var url = require('url-parse');
var express = require('express');
var app = express();
var url = require('url-parse');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var fs = require('fs');


var obj = JSON.parse(fs.readFileSync('studentdir.json', 'utf8'));


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(cookieParser());

/*app.use(function (req, res, next) {
  // check if client sent cookie
  var cookie = req.cookies.currentStu;
  if (cookie === undefined)
  {
    // no: set a new cookie
    var randomNumber=Math.random().toString();
    randomNumber=randomNumber.substring(2,randomNumber.length);
    res.cookie('cookieName',randomNumber, { maxAge: 900000, httpOnly: true });
    console.log('cookie created successfully');
  }
  else
  {
    // yes, cookie was already present
    console.log('cookie exists', cookie);
  }
  next(); // <-- important!
});*/

var students = {};

function makestudents(last, first){
  var id = last + first[0];
  var anObj={
    name: first + " " +last,
    signedIn: true,
    id: id,
    timeOut: 0,
    dateOut: 0,
    dest: "null"
  }
  students[id] = anObj;
}

for (var names in obj) {
  if (obj.hasOwnProperty(names)) {
    console.log(names + " -> " + obj[names].Last);
    makestudents(obj[names].Last,obj[names].First);
  }
}

console.log(students);


var studentDir = {
  evansc: {
    name: "Chris Evans",
    signedIn: true,
    id:"evansc",
    timeOut: 0,
    dateOut: 0,
    dest: "null"
  },
  perkinsj: {
    name: "Jackson Perkins",
    signedIn: true,
    id:"perkinsj",
    timeOut: 0,
    dateOut: 0,
    dest: "null"
  },
  cyrj:{
    name: "James Cyr",
    signedIn: true,
    id:"cyrj",
    timeOut: 0,
    dateOut: 0,
    dest: "null"
  },
  burckn:{
    name: "Noah Burck",
    signedIn: true,
    id:"burckn",
    timeOut: 0,
    dateOut: 0,
    dest: "null"
  }
};

app.get('/',function(req,res){

    res.redirect("/index.html");

});


app.get("/listofnames", function(req, res){
  res.send(students);
});


app.post("/signIn", function(req,res){
  console.log("signOut POST Called!");
  //console.log(req.body);
  console.log("sign in "+ req.body.student);
  students[req.body.student].signedIn = true;
  console.log(students);

});

app.post("/signOut", function(req,res){
  console.log("signOut POST Called!");
  res.cookie("currentStu", req.body.student).send('Cookie is set');
  students[req.body.student].timeOut = getTime();
  students[req.body.student].dateOut= getDate();
  students[req.body.student].signedIn = false;
  res.end('done');

});

app.post("/destinations.html",function(req, res){
  console.log("Cookie: "+ req.cookies.currentStu);
  console.log("current destination as of /destinations "+ req.body.dest);
  console.log("students "+ students);
  students[req.cookies.currentStu].dest = req.body.dest;
  res.redirect("/");
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

  return month + "/" + day + "/" + year;

}


app.use(express.static('public'));

var server = app.listen(8081, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
});
