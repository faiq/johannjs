window.ondevicemotion = function (e) {
  var accel = e.accelerationIncludingGravity;
  document.body.innerHTML = accel.x + "|" + accel.x + "|" + accel.x + "|"
}
