var events;
$(document).ready(function(){
  $.getJSON("/events", {}, function(dat, stat){
    events = dat;
    for(var e in events){
      $("#logtable").append(
        "<tr style=\"border: 3px solid black;\">" +
          "<td style=\"border: 3px solid black;\">" + events[e].name + "</td><td style=\"border: 3px solid black;\">" + events[e].dest + "</td><td style=\"border: 3px solid black;\">" + events[e].dateOut + "/" + events[e].timeOut + "</td><td style=\"border: 3px solid black;\">" + events[e].dateIn + "/" + events[e].timeIn + "</td>" +
        "</tr>"
      );
    }
  });
});
