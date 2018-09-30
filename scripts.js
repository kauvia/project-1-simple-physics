

function startAnimation() {

    let playArea = document.getElementById('container');
    let box = document.getElementById('box'),
        boxPosX = null,
        boxPosY = null;
        mouseY=null;
        mouseX=null;
        rect=null;
        gravity=5;
        mouseDown = false;
        mouseUp = false;

    
        
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
        } else if (mouseDown === false) {
            boxPosX = boxPosX;
            boxPosY = boxPosY;
        }
    }

    function collisonWall() {
        if (boxPosY >= 400) {
            gravity = -gravity * 0.9;
        }
        else if (boxPosY <= 0) {
            gravity = -gravity;
        }
        else 
        gravity = gravity;
    }




    //main game loop functions

    function draw () {
        box.style.top = boxPosY + 'px';
        box.style.left = boxPosX + 'px';
    }
    function update() {
        dragBox();
        boxPosY = boxPosY + gravity;
        collisonWall();


    }
    function mainLoop () {
        update ();
        draw ();
        console.log("logging");
        console.log (boxPosY);
        console.log (gravity);
        requestAnimationFrame (mainLoop);
    }
requestAnimationFrame (mainLoop);


}