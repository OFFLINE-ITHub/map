const touches = { oldEvent: null, newEvent: null };

const scroolInertia = {
    isTouchEnd: true,
    speedX: 0,
    speedY: 0,
    deceleration: 3
};

const camera = { scale: 1, x: 0, y: 0 };

class Sprite {
    constructor(src) {
        this.img = new Image();
        this.img.src = src;
        this.x = 0;
        this.y = 0;
        this.angle = 0;
    }
    changePosition(x, y) {
        this.x = x;
        this.y = y;
    }
    changeAngle(angle) {
        this.angle = (angle * Math.PI) / 180;
    }
}

class Animation {
    constructor(srcFunc, length) {
        this.frames = new Array(length);
        for (let i = 0; i < length; i++) {
            this.frames[i] = new Image();
            this.frames[i].src = srcFunc(i);
        }
        this.x = 0;
        this.y = 0;
        this.count = 0;
        this.angle = 0;
    }
    nextFrame() {
        this.count = (this.count + 1) % this.frames.length;
    }
    changePosition(x, y) {
        this.x = x;
        this.y = y;
    }
    changeAngle(angle) {
        this.angle = (angle * Math.PI) / 180;
    }
}

function phisphysicsUpdate() {
    if (Math.abs(scroolInertia.speedX) > scroolInertia.deceleration && scroolInertia.isTouchEnd) {
        camera.x -= scroolInertia.speedX;
        scroolInertia.speedX > 0 ?
            scroolInertia.speedX -= scroolInertia.deceleration :
            scroolInertia.speedX += scroolInertia.deceleration;
    }
    else scroolInertia.speedX = 0;

    if (Math.abs(scroolInertia.speedY) > scroolInertia.deceleration && scroolInertia.isTouchEnd) {
        camera.y -= scroolInertia.speedY;
        scroolInertia.speedY > 0 ?
            scroolInertia.speedY -= scroolInertia.deceleration :
            scroolInertia.speedY += scroolInertia.deceleration;
    }
    else scroolInertia.speedY = 0;
}
