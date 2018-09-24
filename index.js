const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const Player = require("./player");

const framerate = 15;


app.use('/', express.static(__dirname + '/client'));

const players = (public = true) => {
  const sockets = Object.values(io.sockets.sockets);
  
  if (public) {
    return sockets.map(socket => socket.player.public);
  } else {
    return sockets.map(socket => socket.player);
  }
};

io.on('connection', socket => {
  socket.player = new Player(socket.id);
  socket.emit('welcome', {me: socket.player, oldPlayers: players().filter(player => player.id !== socket.id)});

  socket.broadcast.emit('newPlayer', socket.player.public);

  socket.on('move', input => {
    socket.player.speedX = input.x;
    socket.player.speedY = input.y;
    socket.player.update();
    io.emit('playerMove', socket.player.public);
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('playerDisconnection', socket.id);
  });

});

setInterval(() => {
  players(false).forEach(player => player.update());
  io.emit('updatePlayerPositions', players())
}, 1000 / framerate);

server.listen(3000, () => console.log("Server running on port 3000 !"));