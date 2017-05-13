Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

$(document).ready(function(){
  $.getJSON("/listofnames", {}, function(dat, stat){
    console.log(dat);
    for (var i in dat){
      if (dat.hasOwnProperty(i)) {
        $("#name_" + dat[i].name.substr(0,1).toLowerCase()).append("<tr><td>" + dat[i].name; + "</td><td>" + dat[i].sign + "</td></tr>");
      }
    }
  });
});
