class Hero {
    constructor(name, x, y, h, w, health, img) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.h = h;
        this.w = w;
        this.health = health;
        this.img = img;
        this.bubbles = [];
    }

    show() {
        image(this.img, this.x, this.y);
        text(this.health, this.x + 12, this.y - 2);
    }

    showDeath(img) {
        this.img = img;
        image(this.img, this.x, this.y);
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
         rect(this.x, this.y, 4, 4);
    }

    moveDown() {
        if (this.y >= 5) {
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

    attackResult(val) {
        if (this.health > val) {
            
        } else {
            this.health = -1;
        }
    }

    createBubbles(life1, life2) {       
        let numBubbles = random(1, 2);       
        for (let i = 0; i < numBubbles; i++) {
            let bubble = {
            x: this.x + 27 + random(-3, 3),
            y: this.y + 25 + random(-2, 2),
            size: random(1, 3),
            speed: random(0.2, 0.7),
            createdTime: millis(),
            lifetime: random(life1, life2),
                color: {
                    a: 142
                }
            };
            this.bubbles.push(bubble);
        }
    }

    updateBubbles() {
        // Update bubble positions and remove expired ones
        for (let i = this.bubbles.length - 1; i >= 0; i--) {
            let bubble = this.bubbles[i];
            
            // Move bubble upward
            bubble.y -= bubble.speed;
            
            // Add slight horizontal drift
            bubble.x += sin(millis() * 0.01 + i) * 0.2;
            
            // Check if bubble has expired (3 seconds)
            let elapsed = millis() - bubble.createdTime;
            if (elapsed >= bubble.lifetime) {
                this.bubbles.splice(i, 1);
            } else {
                // Fade out bubble as it ages
                let fadeProgress = elapsed / bubble.lifetime;
                bubble.color.a = 255 * (1 - fadeProgress);
            }
        }
    }

    drawBubbles() {
        // Draw pixelated bubbles
        noStroke();
    
        for (let bubble of this.bubbles) {
            fill(bubble.color.r, bubble.color.g, bubble.color.b, bubble.color.a);
            
            // Draw pixelated bubble (square instead of circle for pixel effect)
            let pixelSize = max(1, floor(bubble.size / 2));
            
            // Draw main bubble body with pixelated edges
            for (let px = -bubble.size/2; px < bubble.size/2; px += pixelSize) {
                for (let py = -bubble.size/2; py < bubble.size/2; py += pixelSize) {
                    let distance = dist(px, py, 0, 0);
                    if (distance < bubble.size/2) {
                        rect(bubble.x + px, bubble.y + py, pixelSize, pixelSize);
                    }
                }
            }
        }
    }
}