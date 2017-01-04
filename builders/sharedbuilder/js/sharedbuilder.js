var builder = {test: true};
var socket = io();
var connected = false;

socket.on("error", function(msg) {
  HHg.warn(msg);
});

socket.on("connection", function(msg) {
  connected = true;
});

socket.on("disconnect", function(msg) {
  connected = false;
});

