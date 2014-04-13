var socket = io.connect('/');
var isMaster;
var roomId;
var username;

function joinGame() {
  var hotLoad = {
    roomId: document.getElementById('room').value,
    name: document.getElementById('username').value
  }
  username = hotLoad.name;
  roomId = hotLoad.roomId;
  socket.emit('newJoin', hotLoad)
}

function DOManipsMaster() {
  isMaster = true;
  var but = document.getElementById('butt');
  but.innerText = "START";

  but.onclick = function() {
    document.getElementById('username').setAttribute('type', 'hidden');
    document.getElementById('room').setAttribute('type', 'hidden');
    document.getElementById('butt').remove();
    socket.emit('gamestart');
  }
}

function DOManipsLave() {
  document.getElementById('room').setAttribute('type', 'hidden');
  document.getElementById('butt').remove();

}


socket.on('gamestart', function() {
  document.getElementById('username').setAttribute('type', 'hidden');
  document.getElementById('room').setAttribute('type', 'hidden');
  document.getElementById('butt').remove();
});

socket.on('roomStatus', function(msg) {
  if (msg == 1) {
    DOManipsMaster();
  } else if (msg == 2) {
    DOManipsLave();
  }
});

socket.on('winnerWinnerChickenDinner', function(winner){
  var color;
  if (name === winner) {
    color = 'green';
  } else {
    color = 'red';
  }
    setInterval (function() {
      document.body.style.backgroundColor = color;
      setTimeout(function() {
        document.body.style.backgroundColor = "cyan"
      }, 20)
      setTimeout(function() {
        document.body.style.backgroundColor = color;
      }, 41)
      setTimeout(function() {
        document.body.style.backgroundColor = "cyan"
      }, 60)
    }, 80)
    document.getElementById('h1').innerText = winner + ' WON1!!!!'
});


function death() {
  var cornshot = {
    username: username,
    roomId: roomId
  };

  console.log(cornshot)
  socket.emit('death', cornshot);
}
