var express = require('express');
var http = require('http');
var path = require('path');
var app = express();
var io = require('socket.io').listen(app);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use('/assets', express.static('assets'));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function (req, res){
    res.sendfile( __dirname +    
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


function popCheck(roomId){
    var pop = io.sockets.clients(roomId).length;
    if(pop == 2){
        console.log("returning a 1");
        return 1;
    }else{
        console.log("new player joining room" + roomId);
        return 0;
    }
}

var activeRooms = {};

io.sockets.on('connection' function(socket){
	console.log('connection detected');

	socket.on('newJoin', function(roomId){
    	if(activeRooms.indexOf(roomId) == -1){
            //new room
            socket.join(roomId);
            activeRooms.push(roomId);
            socket.emit('roomStatus',1);
            console.log("the value of roomID: "+ roomId + "the value of disconnectId: "+ disconnectId);
        }else if(popCheck(roomId) ==0){
            //joining a room with one other person
            socket.join(roomId);
            socket.emit('roomStatus', 2);
            console.log("the value of roomID: "+ roomId + "the value of disconnectId: "+ disconnectId);
        }else{
            //room is full
            socket.emit('roomStatus', 3);
    	}
    })
})