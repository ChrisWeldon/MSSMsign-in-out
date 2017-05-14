$(document).ready(function(){
  // $.getJSON("/listofnames", {}, function(dat, stat){
  //   console.log(dat);
  var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
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
  };

  $("#buttonArray").append("<tr>");
  for (var i in alphabet){
        $("#buttonArray").append("<td><a href=\"#name_" + alphabet[i] + "\">"+ alphabet[i] + "</a></td>");
        if (i % 7 == 6) {
          $("#buttonArray").append("</tr><tr>");
      }
  }

  for(var i in alphabet){
    if (alphabet.hasOwnProperty(i)) {
      $("#names").append("<tr><table><tr><th id=\"name_" + alphabet[i] + "\">" + alphabet[i].toUpperCase() + "</th></tr></table></tr>");
    }
  }
  for (var i in dat){
    $("#name_" + dat[i].name.substr(0,1).toLowerCase()).append("<tr><td>" + dat[i].name + "</td><td>" + function(){if(dat[i].signedIn){return "Signed in</td><td id=\"" + i + "\" class=\"sign\">Sign out";} else{$("#signedOutTable").append("<tr><td>" +
    dat[i].name + "</td><td id=\"" + i + "\" class=\"sign\">Sign in</td></tr>");return "Signed out</td><td id=\"" + i + "\" class=\"sign\">Sign in";}}() + "</td></tr>");
  }

  $(".sign").click(function(){
    dat[$(this).attr('id')].signedIn=!dat[$(this).attr('id')].signedIn;
    if(!dat[$(this).attr('id')].signedIn){
      //go to sign out page
    }
    else{
      window.location.reload();
    }
  })
});
