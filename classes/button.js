class Button {
    constructor(img, x, y, w, h, type) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.type = type;
    }

    show() {
        image(this.img, this.x, this.y, this.w, this.h);
    }
}

const ButtonTypes = Object.freeze({
    START: 1,
    PAUSE: 2,
    SETTINGS: 3,
    STARTCLICKED: 4,
    PAUSECLICKED: 5
})