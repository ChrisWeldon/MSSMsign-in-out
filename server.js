var url = require('url-parse');
var express = require('express');
var app = express();
var url = require('url-parse');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var fs = require('fs');
var sanitizer = require("sanitizer");


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

function makestudents(_name, _last, _first,  _signedIn, _id, _timeOut, _dateOut, _dest){
  var id = _id;
  var anObj={
    name: _name,
    first: _first,
    last: _last,
    signedIn: _signedIn,
    id: _id,
    timeOut: _timeOut,
    dateOut: _dateOut,
    dest: _dest
  }
  students[id] = anObj;
}

for (var names in obj) {
  if (obj.hasOwnProperty(names)) {
    //console.log(names + " -> " + obj[names].last);
    var s = obj[names];
    makestudents(s.name, s.last, s.first, s.signedIn, s.id, s.timeOut, s.dateOut, s.dest);
  }
}

console.log(students);


app.get('/',function(req,res){

  res.redirect("/index.html");

});


app.get("/listofnames", function(req, res){
  res.send(students);
});


app.post("/signIn", function(req,res){
  console.log("signIn POST Called!");
  console.log("sign in "+ req.body.student);
  students[req.body.student].signedIn = true;
  students[req.body.student].dest = "null";
  students[req.body.student].timeOut = 0;
  students[req.body.student].dateOut = 0;
  console.log(students[req.body.student]);
  fs.writeFileSync('studentdir.json', JSON.stringify(students, null, 4));
  fs.appendFileSync("logfile.log", "signIn POST Called on student " + students[req.body.student].name + "\nDate/Time: " + getDate() +"/" + getTime() + "\n\n");
});

app.post("/getCookie", function(req,res){
  res.cookie("currentStu", req.body.student).send('Cookie is set');
  res.end('done');

});

app.post("/destinations.html",function(req, res){ //signOut
  console.log("signOut POST Called!");
  console.log("Cookie: "+ req.cookies.currentStu);
  console.log("current destination as of /destinations "+ sanitizer.sanitize(req.body.dest));
  console.log("students "+ students);
  students[req.cookies.currentStu].dest = sanitizer.sanitize(req.body.dest);
  students[req.cookies.currentStu].timeOut = getTime();
  students[req.cookies.currentStu].dateOut = getDate();
  students[req.cookies.currentStu].signedIn = false;
  fs.writeFileSync('studentdir.json', JSON.stringify(students, null, 4));
  fs.appendFileSync("logfile.log", "signOut POST Called on student " + students[req.cookies.currentStu].name + "\nLocation: " + students[req.cookies.currentStu].dest + "\nDate/Time: " + students[req.cookies.currentStu].dateOut + "/" + students[req.cookies.currentStu].timeOut + "\n\n");
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
  var port = server.address().port;
  require('dns').lookup(require('os').hostname(), function (err, add, fam) {
    console.log('Example app listening at http://%s:%s', add, port);
  })
  fs.appendFileSync("logfile.log", "Started server on port " + port + " at " + getTime() + " on " + getDate() + "\n\n\n");
});
