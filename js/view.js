const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const trails = new Animation(i => `images/trails/trail(${i}).png`, 195);

const teachers = ['Brovko', 'Ermakov', 'Kalikinskaya', 'Kumova', 'Kuzmin', 'Pechenkin', 'Petrova', 'Toropova'];

const ribbons = new Map();
teachers.forEach(t => ribbons.set(t, new Animation(i => `images/${t}/ribbon(${i}).png`, 100)));
ribbons.forEach(r => r.count = Math.floor(Math.random()*r.frames.length))
ribbons.get('Brovko').changePosition(2225, 375);
ribbons.get('Ermakov').changePosition(1500, 375);
// ribbons.get('Kalikinskaya').changePosition(1500, 375);
ribbons.get('Kuzmin').changePosition(1670, 375);
ribbons.get('Pechenkin').changePosition(2050, 375);
// ribbons.get('Ermakov').changePosition(1525, 375);
// ribbons.get('Ermakov').changePosition(1525, 375);
// ribbons.get('Ermakov').changePosition(1525, 375);


// const scroll = new Map();
// teachers.forEach(t => scroll.set(t, new Animation(i => `images/${t}/scroll(${i}).png`, 100)));

const map = new Sprite("images/map.svg");

map.img.onload = function () {
    animation();
}

function animation() {
    update();
    render();
    requestAnimatonFrame(animation);
}

function update() {
    trails.nextFrame();
    teachers.forEach(t => ribbons.get(t).nextFrame())
    // ribbons.forEach(r => r.nextFrame());
    phisphysicsUpdate();
    // scroll.forEach(s => s.nextFrame());
}


function render() {
    context.save();
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.drawImage(map.img, (map.x + camera.x) * camera.scale, (map.y + camera.y) * camera.scale,
        map.img.width * camera.scale, map.img.height * camera.scale);


    ribbons.forEach(r => context.drawImage(r.frames[r.count],
        (r.x + camera.x) * camera.scale,
        (r.y + camera.y) * camera.scale,
        r.frames[r.count].width * camera.scale*0.75,
        r.frames[r.count].height * camera.scale*0.75));
        
    // context.drawImage(ribbons.get("Ermakov").frames[ribbons.get("Ermakov").count],
    //     (ribbons.get("Ermakov").x + camera.x)* camera.scale,
    //     (ribbons.get("Ermakov").y + camera.y)* camera.scale,
    //     ribbons.get("Ermakov").frames[ribbons.get("Ermakov").count].width * camera.scale,
    //     ribbons.get("Ermakov").frames[ribbons.get("Ermakov").count].height * camera.scale)

    context.restore();
}


var requestAnimatonFrame = (function () {
    return window.requestAnimatonFrame ||
        window.webkitRequestAnimatonFrame ||
        window.mozRequestAnimatonFrame ||
        window.oRequestAnimatonFrame ||
        window.msRequestAnimatonFrame ||
        function (callback) {
            window.setTimeout(callback, 15);
        };
})();
