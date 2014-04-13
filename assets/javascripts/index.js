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

}
