Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

$(document).ready(function(){
  // $.getJSON("/listofnames", {}, function(dat, stat){
  //   console.log(dat);
  var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s",
   "t", "u", "v", "w", "x", "y", "z"];
    var dat = {
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
    for(var i in alphabet){
      if (alphabet.hasOwnProperty(i)) {
        $("#NAME").append("<tr><table id=\"name_" + alphabet[i] + "\"><tr><th>" + alphabet[i] + "</th></tr></table></tr>");
      }
    }
    for (var i in dat){
      if (dat.hasOwnProperty(i)) {
        $("#name_" + dat[i].name.substr(0,1).toLowerCase()).append("<tr><td>" + dat[i].name + "<\/td><td>" + dat[i].sign + "<\/td><\/tr>");
      }
    }
  });
