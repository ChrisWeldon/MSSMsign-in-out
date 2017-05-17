var students;
$(document).ready(function(){
  $.getJSON("/listofnames", {}, function(dat, stat){
    students = dat;
    console.log(students);
    var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

    $("#buttonArray").append("<tr>");
    for (var i in alphabet){
          $("#buttonArray").append("<td><a href=\"#name_" + alphabet[i] + "\">"+ alphabet[i].toUpperCase() + "</a></td>");
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
      $("#name_" + dat[i].name.substr(0,1).toLowerCase()).append("<tr><td>" + dat[i].name + "</td><td>" + function(){
        if(dat[i].signedIn){
          return "Signed in</td><td id=\"" + i + "\" class=\"sign\"><button class=\"signout-button\" onclick=\'signOut(\"" + dat[i].id + "\")\'>Sign Out</button>";
        }else{
          $("#signedOutTable").append("<tr><td>" +
          dat[i].name + "</td><td>" + dat[i].timeOut + "</td><td>" + dat[i].dateOut + "</td><td>" + dat[i].dest + "</td><td id=\"" + i + "\" class=\"sign\"><button class=\"signin-button\" onclick=\'signIn(\"" + dat[i].id + "\")\'>Sign In</button></td></tr>");
          return "Signed out</td><td id=\"" + i + "\" class=\"sign\"><button class=\"signin-button\" onclick=\'signIn(\"" + dat[i].id + "\")\'>Sign In</button>";}
        }() + "</td></tr>");
    }


  });
});

function signIn(student){
  console.log("signIn called! " + student);
  console.log('HERE IS THE LOCAL OBJECT '+ students);
  console.log(students);
  console.log(students[student]);
  console.log(students[student].name);
  $.post("/signIn", {student: students[student].id});
  window.location.reload();
}
function signOut(student){
  $.post("/signOut", {student: students[student].id});
  window.location.replace("/destinations.html");
  //window.location.reload();
}

window.setInterval(function(){
  $.getJSON("/listofnames", function(dat, stat){
    if(dat != students){
      window.location.reload();
    }
  });
}, 60000);

function refresh(){

}
