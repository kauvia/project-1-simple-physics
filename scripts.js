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


    let timestep = 1000 / 60,
        lastFrameTimeMs = 0,
        numUpdateSteps = 0,
        delta = 0,
        fps = 30,
        framesThisSecond = 0,
        lastFPSUpdate = 0,
        boxVelocity = 0;
        boxAcceleration = 0.00008;



      
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
            box.style.background = 'pink'; 
        } else if (mouseDown === false) {
            boxPosX = boxPosX;
            boxPosY = boxPosY;
            box.style.background = 'red'; 
        }
    }

    function collisonWall() {
        if (boxPosY >= 750 && boxVelocity >= 0.005 || boxPosY <= 0) {
            boxVelocity = -boxVelocity * .9 ;
        };
   }

   function breakWall() {
    if (boxPosY >= 900 || boxPosY <= -5){
        boxPosY = 300;
        boxPosX = 300;
    }
    else if (boxPosY >= 750 && boxVelocity >= 0.0005 || boxPosY <= -100) {
        boxAcceleration = 0;
        boxVelocity = 0;
    }
    else if (boxPosY >=750 && boxVelocity == 0) {
        boxVelocity = 0;
        boxAcceleration = 0;
    }
    else {
        boxAcceleration =0.00008;
    }
   }


 
    //main game loop functions

    function panic () {
        delta = 0;
    }

    function draw () {
        box.style.top = boxPosY + 'px';
        box.style.left = boxPosX + 'px';
        fpsDisplay.textContent = Math.round(fps) + 'FPS';
    }
    function update() {

        boxVelocity = boxVelocity + boxAcceleration * delta;
        boxPosY = boxPosY + boxVelocity * delta;
        dragBox();
        collisonWall();
        breakWall();



    }
    function mainLoop (timestamp) {
        delta += timestamp - lastFrameTimeMs;
        lastFrameTimeMs = timestamp;

        if (timestamp > lastFPSUpdate + 1000) {
            fps = 0.25 * framesThisSecond + (1 - 0.25) * fps;
            lastFPSUpdate = timestamp;
            framesThisSecond = 0;
        }
        framesThisSecond++;

        while (delta >= timestep) {
            update ();
            delta -= timestep;
            if (++numUpdateSteps >= 240) {
                panic();
                break;
            }
        };
        draw ();
        console.log("logging");
        console.log (boxPosY);
        console.log ("boxvelocity = ", boxVelocity);
        console.log ("boxacceleration = ", boxAcceleration);
//        console.log ("delta = ", delta);
//        console.log ("lastframetimems = ", lastFrameTimeMs);
//        console.log ("timestamp = ", timestamp);
        requestAnimationFrame (mainLoop);
    }
requestAnimationFrame (mainLoop);


}