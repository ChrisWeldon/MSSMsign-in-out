
var app = express();

var students = {};

app.get("/listofnames", function(req, res){
  res.send();
});


app.use(express.static('public'));

var server = app.listen(8081, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
});
