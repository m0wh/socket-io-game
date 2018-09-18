const player = document.getElementById('player');

let speed = {
  x: 0,
  y: 0
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