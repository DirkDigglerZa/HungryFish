class Scenery {
    constructor(img, x, y, w, h) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.h = h;
        this.w = w;
    }

    show() {
        image(this.img, this.x, this.y, this.w, this.h);
    }
}