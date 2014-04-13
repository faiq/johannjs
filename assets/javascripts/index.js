window.ondevicemotion = function (e) {  
  alert (e.accelerationIncludingGravity.x); 
  alert (e.accelerationIncludingGravity.y); 
  alert (e.accelerationIncludingGravity.z);
} 

var socket = io.connect("/"), 
  angle, 
  angleOffset = 0;

window.on('shake', shakefunc, false); 

function shakefunc (){
  if (



}
