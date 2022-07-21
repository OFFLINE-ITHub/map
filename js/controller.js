
canvas.addEventListener("touchstart", function (event) {
    event.preventDefault();
    touches.newEvent = event;
    touches.oldEvent = event;
    scroolInertia.isTouchEnd = false;
});

canvas.addEventListener("touchmove", function (event) {
    event.preventDefault();
    if (event.touches.length == 1) {
        touches.newEvent = event;

        scroolInertia.speedX = 20 * (touches.newEvent.touches[0].clientX - touches.oldEvent.touches[0].clientX)
            / (touches.newEvent.timeStamp - touches.oldEvent.timeStamp);

        scroolInertia.speedY = 20 * (touches.newEvent.touches[0].clientY - touches.oldEvent.touches[0].clientY)
            / (touches.newEvent.timeStamp - touches.oldEvent.timeStamp);

            camera.x += (touches.newEvent.touches[0].clientX - touches.oldEvent.touches[0].clientX);
            camera.y += (touches.newEvent.touches[0].clientY - touches.oldEvent.touches[0].clientY);

        touches.oldEvent = event;
    };
    if (event.touches.length == 2) {
        touches.newEvent = event;

        let s = Math.sqrt((touches.newEvent.touches[0].clientX - touches.newEvent.touches[1].clientX) ** 2 + (touches.newEvent.touches[0].clientY - touches.newEvent.touches[1].clientY) ** 2) /
            Math.sqrt((touches.oldEvent.touches[0].clientX - touches.oldEvent.touches[1].clientX) ** 2 + (touches.oldEvent.touches[0].clientY - touches.oldEvent.touches[1].clientY) ** 2);

        if (camera.scale * s < 0.64) camera.scale = 0.64;
        else camera.scale *= s;

        touches.oldEvent = event;
    };

});

canvas.addEventListener("touchend", function (event) {
    event.preventDefault();
    if (event.touches.length == 0)
        scroolInertia.isTouchEnd = true;
});