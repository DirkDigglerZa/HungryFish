class Enemy {
    constructor(name, x, y, h, w, img, hp, posStart, tTilt, tAngle, tSpeed, visible, difficulty) {
      this.name = name;
      this.x = x;
      this.y = y;
      this.h = h;
      this.w = w;
      this.hp = hp;
      this.img = img;
      this.tTilt = tTilt;
      this.tAngle = tAngle;
      this.tSpeed = tSpeed;
      this.visible = visible;
      this.difficulty = difficulty;
    }

    startTime = 5;
    frameCount = 60;

    intersects(other) {
      let d = dist(this.x, this.y, other.x, other.y);
      return (d < this.w + other.w || d < this.h + other.h);
    }
  
    move() {
      if (this.visible) {
        if (this.tTilt > 0) {
          this.x = this.x += -this.tSpeed;
          this.y = this.y += this.tAngle;
        } else {
          this.x = this.x += -this.tSpeed;
          this.y = this.y += -this.tAngle;
        }
      } else {
        this.x = -7000;
        this.y = -1000
      }
    }
  
    show() {
      if (this.visible) {
        image(this.img, this.x, this.y);     
      }       
    }

    checkBounds() {
      let exited = false;
      if (this.x < 0 || this.x > width) {
        exited = true;
      } 
      if (this.y < 0 || this.y > height) {
        exited = true;
      }
      return exited;
    }

    hide() {
      this.visible = false;
    }
}