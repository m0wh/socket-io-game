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
  }
}, false);

const malo = new Player("#malo", 400, 300, true);
const paul = new Player("#paul", 200, 150, true);

setInterval(function() {

  malo.speedX = input.x;
  malo.speedY = input.y;
  malo.update();

  paul.speedX = input.x;
  paul.speedY = input.y;
  paul.update();

}, 1000 / 30);