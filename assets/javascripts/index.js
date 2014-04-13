var prev_accel;
var prev_x = 0;
var prev_y = 0;
var prev_z = 0;

var socket = io.connect("/"),
  angle,
  angleOffset = 0;

window.ondevicemotion = function (e) {
  var accel = e.accelerationIncludingGravity;
  if (Math.abs(accel.x - prev_x) > 5 && Math.abs(accel.y - prev_y) > 5 || 
      Math.abs(accel.x - prev_x) > 5 && Math.abs(accel.z - prev_z) > 5 ||
      Math.abs(accel.y - prev_y) > 5 && Math.abs(accel.z - prev_z) > 5){
      
      document.body.innerHTML = "shake event"; 
  }
  prev_accel = accel;
}
