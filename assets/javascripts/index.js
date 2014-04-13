<<<<<<< HEAD
window.ondevicemotion = function (e) {  
    accelerationIncludingGravity.x; 
  e.accelerationIncludingGravity.y; 
e.accelerationIncludingGravity.z;
} 

var socket = io.connect("/"), 
  angle, 
  angleOffset = 0;

window.on('shake', shakefunc, false); 

function shakefunc (){
    console.log('shake it');

=======
window.ondevicemotion = function (e) {
  var accel = e.accelerationIncludingGravity;
  document.body.innerHTML = accel.x + "|" + accel.x + "|" + accel.x + "|"
>>>>>>> 3efdc243773f81b1c0dba4c44104e208731b343f
}
