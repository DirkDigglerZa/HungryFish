class ButtonFactory {
    constructor(buttonArr) {
        this.buttonArr = buttonArr;
    }

    remove (type) {
        for (let i = 0; i < this.buttonArr.length; i++) {
            if (this.buttonArr[i].type == type) {
                this.buttonArr.splice(i, 1);
            }
        }
    }

    add (button) {
        this.buttonArr.push(button);
    }

    get(type) {
        for (let i = 0; i < this.buttonArr.length; i++) {
            if (this.buttonArr[i].type == type) {
                return this.buttonArr[i];
            }
        }
    }
}