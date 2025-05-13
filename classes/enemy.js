class Enemy {
    constructor(name, x, y, h, w, img, health, posStart, tTilt, tAngle, tSpeed) {
      this.name = name;
      this.x = x;
      this.y = y;
      this.h = h;
      this.w = w;
      this.health = health;
      this.img = img;
      this.tTilt = tTilt;
      this.tAngle = tAngle;
      this.tSpeed = tSpeed;
    }

    // clicked(px, py) {
    //     if (
    //       px > this.x &&
    //       px < this.x + this.r &&
    //       py > this.y &&
    //       py < this.y + this.r
    //     ) {
    //       this.kitten = flower;
    //     }
    //   }

      intersects(other) {
        let d = dist(this.x, this.y, other.x, other.y);
        return (d < this.w + other.w || d < this.h + other.h);
      }
    
      move() {
        if (this.tTilt > 0) {
          this.x = this.x += -this.tSpeed;
          this.y = this.y += this.tAngle;
        } else {
          this.x = this.x += -this.tSpeed;
          this.y = this.y += -this.tAngle;
        }
      }
    
      show() {
        image(this.img, this.x, this.y);
      }

      checkBounds() {
        let exited = false;
        if (this.x < 0 || this.x > width) {
          exited = true;
        } 
        if (this.y < 0 || this.y > seaHeight) {
          exited = true;
        }
        return exited;
      }
}