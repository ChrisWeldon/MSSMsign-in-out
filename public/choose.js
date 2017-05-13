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
        name: "Noah Burk",
        sign: false
      }
    }
    for (var i in dat){
      if (dat.hasOwnProperty(i)) {
        $("#name_a").append("<tr><td>" + dat[i].name + "</td><td>" + dat[i].sign + "</td></tr>");
      }
    }
  });
