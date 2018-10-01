function startAnimation() {

    let playArea = document.getElementById('container');
    let box = document.getElementById('box'),
        fpsDisplay = document.getElementById('fpsDisplay'),
        boxPosX = null,
        boxPosY = null,
        mouseY=null,
        mouseX=null,
        rect=null,
        mouseDown = false,
        fps = 30,
        boxVelocity = 0;
        boxAcceleration = 0.5;



      
    document.addEventListener('mousemove',function (e){
        rect=playArea.getBoundingClientRect();
        mouseY=e.clientY-rect.top;
        mouseX=e.clientX-rect.left;
        });
    box.addEventListener('mousedown', moveBox, false);
    box.addEventListener('mouseup',stopMoveBox, false);


    // mini functions

    function moveBox() {
        mouseDown = true;
    };
    function stopMoveBox(){
        mouseDown = false;
    }

    function dragBox() {
        if (mouseDown === true) {
            boxPosX = mouseX-10;
            boxPosY = mouseY-15;
            boxVelocity = 0;
        } else if (mouseDown === false) {
            boxPosX = boxPosX;
            boxPosY = boxPosY;
            
        }
    }

    function collisonWall() {
        if (boxPosY >= 750 || boxPosY <= 0) {
            boxVelocity = -boxVelocity ;
        };
   }




 
    //main game loop functions


    function draw () {
        box.style.top = boxPosY + 'px';
        box.style.left = boxPosX + 'px';
        fpsDisplay.textContent = Math.round(fps) + 'FPS';
    }
    function update() {

        boxVelocity = boxVelocity + boxAcceleration;
        boxPosY = boxPosY + boxVelocity;
        dragBox();
        collisonWall();




    }
    function mainLoop () {

        update ();
        draw ();
//       console.log("logging");
//       console.log (boxPosY);
//        console.log ("boxvelocity = ", boxVelocity);
//        console.log ("boxacceleration = ", boxAcceleration);
//        console.log ("delta = ", delta);
//        console.log ("lastframetimems = ", lastFrameTimeMs);
//        console.log ("timestamp = ", timestamp);
        requestAnimationFrame (mainLoop);
    }
requestAnimationFrame (mainLoop);


}