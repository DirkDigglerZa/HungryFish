class Hero {
    constructor(name, x, y, h, w, health, img) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.h = h;
        this.w = w;
        this.health = health;
        this.img = img;
    }

    show() {
        image(this.img, this.x, this.y);
        text(this.health, this.x + 12, this.y - 2);
    }

    showDeath(img) {
        this.img = img;
        image(this.img, this.x, this.y);
        //text('Game over', this.x + 12, this.y - 1);
    }
    
    intersects(enemy) {
        let d = dist(this.x, this.y, enemy.x, enemy.y);
        return (d < this.h + enemy.h || d < this.w + enemy.w);
    }

    showRight(image) {
        this.img = image;
    }

    showLeft(image) {
        this.img = image;
    }

    moveUp() {
        if (this.y >= 10) {
            this.y -=4;
        }
    }

    moveDown() {
        if (this.y <= seaHeight) {
            this.y +=4;
        }    
    }

    moveLeft() {
        if (this.x >= 5) {
            this.x -=4;
        }
    }

    moveRight() {
        if (this.x <= width-25) {
            this.x +=4;
        }
    }

    checkDeath(val) {
        if (this.health > val) {
            this.health += val;
            return this.health + val;
        } else {
            this.health = 0;
            return 0;
        }
    }
}