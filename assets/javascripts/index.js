var prev_accel;
var prev_x = 0;
var prev_y = 0;
var prev_z = 0;

var socket = io.connect("/"),
  angle,
  angleOffset = 0;

window.ondevicemotion = function (e) {
  var accel = e.accelerationIncludingGravity;
  if (Math.abs(accel.x - prev_x) > 5) {
      document.body.innerHTML = accel.x + "|" + accel.y + "|" + accel.z + "|";
  }
  prev_accel = accel;
}
