$(document).ready(function(){
  // $.getJSON("/listofnames", {}, function(dat, stat){
  //   console.log(dat);
  var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s",
   "t", "u", "v", "w", "x", "y", "z"];
    var dat = {
      chris: {
        name: "Chris Evans",
        signedIn: true
      },
      jackson: {
        name: "Jackson Perkins",
        signedIn: false
      },
      noah:{
        name: "Noah Burck",
        signedIn: false
      }
    }
    for(var i =0; i<6; i++){
      $("#buttonArray").append("<tr id=\"" + i.toString() + "\">");
      if(i<6){
        for(var j = 0; j<5; j++){
          $("#"+(i*6).toString()).append("<td><a href=\"#name_" + alphabet[(i*6)+j] + "\">" + alphabet[(i*6)+j]+ "</a></td>");
        }
      }
      else{
        for(var j = 0; j<5; j++){
          $("#"+i.toString()).append("<td><a href=\"#name_" + alphabet[i+j] + "\">" + alphabet[i+j]+ "</a></td>");
        }
      }
      $("#"+i.toString()).append("</tr>");
    }

    if(decodeURIComponent(window.location.href).search("signOut")!=-1){
      $("#title").append("<h1>Signing out.");
    }
    else if(decodeURIComponent(window.location.href).search("signIn")!=-1){
      $("#title").append("<h1>Signing in.");
    }
    for(var i in alphabet){
      if (alphabet.hasOwnProperty(i)) {
        $("#NAME").append("<tr><table><tr><th id=\"name_" + alphabet[i] + "\">" + alphabet[i].toUpperCase() + "</th></tr></table></tr>");
      }
    }
    for (var i in dat){
      if (dat.hasOwnProperty(i)) {
        $("#name_" + dat[i].name.substr(0,1).toLowerCase()).append("<tr><td>" + dat[i].name + "</td><td>" + function(){if(dat[i].signedIn){return "signed in";} else{return "signed out";}}() + "</td></tr>");
      }
    }
  });
