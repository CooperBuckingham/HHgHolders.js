var express = require('express');
var server = express();
var http = require('http').Server(server);
var io = require('socket.io')(http);
var path = require('path');
var HHg = {warn: console.log};


var dir = path.normalize(__dirname);

server.get('/', function(req, res){
  res.sendFile(path.join(dir, 'builderIndex.html'));
});

server.use(express.static('www'));
server.use(express.static('builders'));

io.on('connection', function(socket){
  HHg.warn('a user connected');
  socket.on('character:create', function(obj){
    //write obj to file
  });
  socket.on('character:update', function(obj){
    //if file for character doesn't exist, throw error
    io.emit('error', "Error: Character Update: Tried to update a non-existant file.");
  });
});

http.listen(4000, function(){
  HHg.warn('Shining Builder Running on localhost:4000');
});