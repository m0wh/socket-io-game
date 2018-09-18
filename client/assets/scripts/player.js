const player = document.getElementById('player');

let keys = {
  top: false,
  right: false,
  bottom: false,
  left: false,
}

const usedKeys = ["z","q","s","d"];

window.addEventListener("keydown", (key) => {
  if (!key.repeat && usedKeys.includes(key.key)) {
    if (key.key === "z") {
      keys.top = true;
    } else if (key.key === "s") {
      keys.bottom = true;
    } else if (key.key === "q") {
      keys.left = true;
    } else if (key.key === "d") {
      keys.right = true;
    }
    checkDirection(keys);
  }
}, false);

window.addEventListener("keyup", (key) => {
  if (!key.repeat && usedKeys.includes(key.key)) {
    if (key.key === "z") {
      keys.top = false;
    } else if (key.key === "s") {
      keys.bottom = false;
    } else if (key.key === "q") {
      keys.left = false;
    } else if (key.key === "d") {
      keys.right = false;
    }
    checkDirection(keys);
  }
}, false);


const checkDirection = ({ top, right, bottom, left }) => {
  let direction;

  if (left) {
    direction = "left"
  }

  if (right) {
    direction = "right"
  }

  if (top) {
    direction = "top";
    if (left) {
      direction += "-left";
    } else if (right) {
      direction += "-right";
    }  
  }  

  if (bottom) {
    direction = "bottom";
    if (left) {
      direction += "-left";
    } else if (right) {
      direction += "-right";
    }  
  }

  if (!left && !bottom && !right && !top) {
    direction = "";
  }
  
  player.dataset.direction = direction;
}