/* convert student csv in format lastname, firstname to studentdir.json with this regex
match: (.+)( )(.)(.+)
replace: "$1$3": {\n\t"name":"$3$4 $1",\n\t"first": "$3$4",\n\t"last": "$1", \n\t"signedIn": true,\n\t"id": "$1$3",\n\t"timeOut": 0,\n\t"dateOut": 0,\n\t"dest": "null"\n},\n
*/
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
var log = JSON.parse(fs.readFileSync('log.json', 'utf8'));

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
var events = [];

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

function makeevent(_name, _destination, _timeOut, _dateOut, _timeIn, _dateIn){
  var eventobj={
    name: _name,
    dest: _destination,
    timeOut: _timeOut,
    dateOut: _dateOut,
    timeIn: _timeIn,
    dateIn: _dateIn
  }
  events.push(eventobj);
}

for (var names in obj) {
  if (obj.hasOwnProperty(names)) {
    //console.log(names + " -> " + obj[names].last);
    var s = obj[names];
    makestudents(s.name, s.last, s.first, s.signedIn, s.id, s.timeOut, s.dateOut, s.dest);
  }
}

for(var e in log){
  makeevent(log[e].name, log[e].dest, log[e].timeOut, log[e].dateOut, log[e].timeIn, log[e].dateIn);
}

console.log(students);


app.get('/',function(req,res){
  res.redirect("/index.html");
});

app.get("/log", function(req, res){
  res.redirect("/log.html");
});

app.get("/events", function(req, res){
  res.send(events);
});

app.get("/listofnames", function(req, res){
  res.send(students);
});


app.post("/signIn", function(req,res){
  events.unshift({
    name: students[req.body.student].name,
    dest: students[req.body.student].dest,
    timeOut: students[req.body.student].timeOut,
    dateOut: students[req.body.student].dateOut,
    timeIn: getTime(),
    dateIn: getDate()
  });
  console.log("signIn POST Called!");
  console.log("sign in "+ req.body.student);
  students[req.body.student].signedIn = true;
  students[req.body.student].dest = "null";
  students[req.body.student].timeOut = 0;
  students[req.body.student].dateOut = 0;
  console.log(students[req.body.student]);
  fs.writeFileSync("studentdir.json", JSON.stringify(students, null, 4));
  fs.appendFileSync("logfile.log", "signIn POST Called on student " + students[req.body.student].name + "\nDate/Time: " + getDate() +"/" + getTime() + "\n\n");
  fs.writeFileSync("log.json", JSON.stringify(events, null, 4));
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
