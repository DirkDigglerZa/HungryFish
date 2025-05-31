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

    getHealth() {
        return this.health;
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

    attackResult(val, state) {
        if (this.health > val) {
            switch(state) {
                case GAME_PROGRESSION.ONE : this.health += SCORE_PROGRESSION.ONE; break;
                case GAME_PROGRESSION.TWO : this.health += SCORE_PROGRESSION.TWO; break;
                case GAME_PROGRESSION.THREE : this.health += SCORE_PROGRESSION.THREE; break;
                case GAME_PROGRESSION.FOUR : this.health += SCORE_PROGRESSION.FOUR; break;
                case GAME_PROGRESSION.FIVE : this.health += SCORE_PROGRESSION.FIVE; break;
                case GAME_PROGRESSION.SIX : this.health += SCORE_PROGRESSION.SIX; break;
                case GAME_PROGRESSION.SEVEN : this.health += SCORE_PROGRESSION.SEVEN; break;
                case GAME_PROGRESSION.EIGHT : this.health += SCORE_PROGRESSION.EIGHT; break;
                case GAME_PROGRESSION.NINE : this.health += SCORE_PROGRESSION.NINE; break;
                case GAME_PROGRESSION.TEN : this.health += SCORE_PROGRESSION.TEN; break;
            }
        } else {
            this.health = -1;
        }
    }
}