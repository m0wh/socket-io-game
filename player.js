const names = require('./names');

module.exports = class Player {
  constructor(id) {
    this.id = id;
    this.x = 0;
    this.y = 0;
    this._speedX = 0;
    this._speedY = 0;
    this.speed = 10;
    this.direction = "";
    this.name = names[Math.floor(Math.random() * names.length)];
  }

  set speedX(n) {
    this._speedX = n
  }

  set speedY(n) {
    this._speedY = n
  }

  get public() {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
      direction: this.direction,
      name: this.name
    }
  }

  checkDirection() {
    if (this._speedY < 0) {
      if (this._speedX > 0) {
        this.direction = "top-right";
      } else if (this._speedX < 0) {
        this.direction = "top-left";
      } else {
        this.direction = "top";
      }
    } else if (this._speedY > 0) {
      if (this._speedX > 0) {
        this.direction = "bottom-right";
      } else if (this._speedX < 0) {
        this.direction = "bottom-left";
      } else {
        this.direction = "bottom";
      }
    } else {
      if (this._speedX > 0) {
        this.direction = "right";
      } else if (this._speedX < 0) {
        this.direction = "left";
      } else {
        this.direction = "";
      }
    }
  }

  update() {
    this.checkDirection();

    if (this.direction.includes("-")) { // diagnonal movment
      this.x += this._speedX * this.speed * Math.cos(Math.PI/4);
      this.y += this._speedY * this.speed * Math.sin(Math.PI/4);
    } else {
      this.x += this._speedX * this.speed;
      this.y += this._speedY * this.speed;
    }
  }
}