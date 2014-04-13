var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);


// all environments
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static('assets'));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function (req, res) {
  res.sendfile( __dirname + '/views/index.html')
});


server.listen(app.get('port'), function(e) {
  console.log('Express server listening on port ' + app.get('port'));
});

function popCheck(roomId) {
  var pop = io.sockets.clients(roomId).length;
  if (pop == 2) {
    console.log("returning a 1");
    return 1;
  } else {
    console.log("new player joining room " + roomId);
    return 0;
  }
}
function findVictor(room){
  console.log(room);
  if (room.deathCount == room.count - 1) {
    for (key in room.players) {
      if (room.players.hasOwnProperty(key)) {
        if (room.players[key].living) {
          return room.players[key].name;
        }
      }
    }
  }
}
/*
 * casts to clients
 */
function flipGameState(socket) {
  socket.broadcast.emit('toggleGameState');
}

function Player(name) {
  this.living = true;
  this.name = name;
}

function Game(obj) {
  var room = obj.room;
  var socket = obj.socket;
  var state = 1;
  this.count = 1;
  this.deathCount = 0;
  this.players = new Object();

  //I think this will work
  // state: (fast or slow)
  function loop() {
    socket.broadcast.to(room).emit('toggleGameState', state *= -1);
  }

  function start() {
    setInterval(loop, 200)
  }

}

var activeRooms = new Object();

io.sockets.on('connection', function(socket) {
  var roomNumber;
  var timer;

  socket.on('newJoin', function(hotlad) {
    roomId = hotlad.roomId;
    console.log('hotlad:', hotlad);
    name = hotlad.name;
    if (!activeRooms[roomId]) {
      //new room
      socket.join(roomId);
      activeRooms[roomId] = new Game({room: roomId, socket: socket});
      socket.emit('roomStatus', 1);
      activeRooms[roomId].players[name] = new Player(name);
    } else if (popCheck(roomId) == 0) {
      //joining a room with one other person
      socket.join(roomId);
      activeRooms[roomId].count++;
      socket.emit('roomStatus', 2);
      activeRooms[roomId].players[name] = new Player(name);
    } else {
      //room is full
      socket.emit('roomStatus', 3);
    }
  });

  socket.on('gamestart', function() {
    socket.broadcast.emit('gamestart', 'msg');
    setInterval(function() {
      flipGameState(socket)
    }, 5000);
  });

  socket.on('death', function(cumbAth) {
    console.log('DEADTHHHHHH');
    console.log(cumbAth);
    var doge;
    var room = activeRooms[cumbAth.roomId];
    room.deathCount++;
    room.players[cumbAth.username].living = false;
    doge = findVictor(room);
    console.log(doge);
    socket.broadcast.emit('winnerWinnerChickenDinner', doge);
    socket.emit('winnerWinnerChickenDinner', doge);
    delete activeRooms[cumbAth.roomId];
  });


});
