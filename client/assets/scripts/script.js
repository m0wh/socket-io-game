const socket = io();
const game = document.getElementById("game");
let myId;
let born = false;

socket.on('newPlayer', (playerObject) => {
  drawPlayer(playerObject);
});

socket.on('welcome', ({ me, oldPlayers }) => {
  drawPlayer(me, true);
  oldPlayers.forEach(drawPlayer);
});

socket.on('playerMove', (playerObject) => {
  updatePlayer(playerObject);
});

socket.on('playerDisconnection', id => {
  deletePlayer(id);
});

socket.on('updatePlayerPositions', players => {
  players.forEach(updatePlayer);
  console.log("hé")
});

/* ====== INPUT ====== */

const input = {
  x: 0,
  y: 0
}

const usedKeys = ["z","q","s","d"];

window.addEventListener("keydown", (key) => {
  if (!key.repeat && usedKeys.includes(key.key)) {
    if (key.key === "z") {
      input.y --;
    } else if (key.key === "s") {
      input.y ++;
    } else if (key.key === "d") {
      input.x ++;
    } else if (key.key === "q") {
      input.x --;
    }
    socket.emit('move', input);
  }
}, false);

window.addEventListener("keyup", (key) => {
  if (!key.repeat && usedKeys.includes(key.key)) {
    if (key.key === "z") {
      input.y ++;
    } else if (key.key === "s") {
      input.y --;
    } else if (key.key === "d") {
      input.x --;
    } else if (key.key === "q") {
      input.x ++;
    }
    socket.emit('move', input);
  }
}, false);


const drawPlayer = ({id, x, y, direction, name}, isMe = false) => {
  game.innerHTML += `<div class="player" id="p${id}" data-direction="${direction}" data-name="${name}"></div>`;
  const player = game.querySelector("#p" + id);
  player.style.left = x + "px";
  player.style.top = y + "px";
  player.style.zIndex = y + "";
  if (isMe) {
    player.classList.add("me");
  }
}

const updatePlayer = ({id, x, y, direction}) => {
  const player = game.querySelector("#p" + id);
  player.style.left = x + "px";
  player.style.top = y + "px";
  player.style.zIndex = Math.floor(y);
  player.dataset.direction = direction;
}

const deletePlayer = id => {
  const player = game.querySelector("#p" + id);
  player.remove();
}