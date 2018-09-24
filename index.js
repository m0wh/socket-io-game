const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const Player = require("./player");


app.use('/', express.static(__dirname + '/client'));

const players = (public = true) => {
  const sockets = Object.values(io.sockets.sockets);
  console.log(...sockets.map(socket => socket.player.public));
  
  if (public) {
    return sockets.map(socket => socket.player.public);
  } else {
    return sockets.map(socket => socket.player);
  }
};

io.on('connection', socket => {
  socket.player = new Player(socket.id);
  socket.emit('welcome', {me: socket.player, oldPlayers: players().map(p => p !== socket.player)});

  socket.broadcast.emit('newPlayer', socket.player.public);
  socket.on('move', input => {
    socket.player.speedX = input.x;
    socket.player.speedY = input.y;
    socket.player.update();
    io.emit('playerMove', socket.player.public);
  });

});


server.listen(8080, () => console.log("Server running on port 8080 !"));