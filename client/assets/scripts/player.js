const player = document.getElementById('player');
const framerate = 30;

let speed = {
  x: 0,
  y: 0,
  scl: 6
}

const usedKeys = ["z","q","s","d"];

window.addEventListener("keydown", (key) => {
  if (!key.repeat && usedKeys.includes(key.key)) {
    if (key.key === "z") {
      speed.y ++;
    } else if (key.key === "s") {
      speed.y --;
    } else if (key.key === "d") {
      speed.x ++;
    } else if (key.key === "q") {
      speed.x --;
    }
    checkDirection(speed);
  }
}, false);

window.addEventListener("keyup", (key) => {
  if (!key.repeat && usedKeys.includes(key.key)) {
    if (key.key === "z") {
      speed.y --;
    } else if (key.key === "s") {
      speed.y ++;
    } else if (key.key === "d") {
      speed.x --;
    } else if (key.key === "q") {
      speed.x ++;
    }
    checkDirection(speed);
  }
}, false);


const checkDirection = ({x, y}) => {
  let direction = "";

  if (y > 0) {
    direction = "top";
    if (x > 0) {
      direction += "-right";
    } else if (x < 0) {
      direction += "-left";
    }
  } else if (y < 0) {
    direction = "bottom";
    if (x > 0) {
      direction += "-right";
    } else if (x < 0) {
      direction += "-left";
    }
  } else {
    if (x > 0) {
      direction = "right";
    } else if (x < 0) {
      direction = "left";
    }
  }
  
  player.dataset.direction = direction;
}

setInterval(() => {
  
  
  if (player.dataset.direction.includes("-")) { // if diagonal
    player.dataset.x = Number(player.dataset.x) + speed.x * speed.scl * Math.cos(Math.PI / 4);
    player.dataset.y = Number(player.dataset.y) + speed.y * speed.scl * Math.sin(Math.PI / 4);
  } else {
    player.dataset.x = Number(player.dataset.x) + speed.x * speed.scl;
    player.dataset.y = Number(player.dataset.y) + speed.y * speed.scl;
  }

  player.style.left = player.dataset.x + "px";
  player.style.bottom = player.dataset.y + "px";

}, 1000/framerate);