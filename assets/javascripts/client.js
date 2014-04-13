var socket = io.connect('/');

function piss() {
  socket.emit('newJoin', 1);
}
