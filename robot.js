document.getElementById("lefteye").style.backgroundColor = "green";
document.getElementById("head").style.transform = "rotate(15deg)";
document.getElementById("body").style.border = "2px solid black";
document.getElementById("mouth").style.borderRadius = "10px";
document.getElementById("righteye").style.border = "3px dotted yellow"
document.getElementById("leftarm").style.backgroundColor = "red"
document.getElementById("message").style.color = "green"
document.getElementById("head").style.borderTop = "15px solid black"

var rightEye = document.getElementById("righteye");
var leftEye = document.getElementById("lefteye");
var leftArm = document.getElementById("leftarm");
var rightArm = document.getElementById("rightarm");
var Nose = document.getElementById("nose");
var Body = document.getElementById("body");
var Mouth = document.getElementById("mouth");
var Head = document.getElementById("head");


rightEye.addEventListener("click", moveUpDown);
leftEye.addEventListener("click", moveUpDown);
leftArm.addEventListener("click", moveRightLeft);
Nose.addEventListener("click", moveBigSmall);
rightArm.addEventListener("click", rotateAndSpin);
Mouth.addEventListener("click", mouthTalk);
Body.addEventListener("click", Shake);
Head.addEventListener("click", rotateAndSpinFast);

function moveUpDown(e) {
    var robotPart = e.target
    var top = 0;

    var id = setInterval(frame, 10);

    function frame() {
        robotPart.style.top = top + "%";
        top++;
        if (top > 20) {
            clearInterval(id);
        }
    }
}

function moveRightLeft(e) {
    var robotPart = e.target;
    var left = 0

    var id = setInterval(frame, 10);

    function frame() {
        robotPart.style.left = left + "%";
        left++;
        if (left > 70) {
            clearInterval(id)
        }
    }
}

function moveBigSmall(e) {
    var robotPart = e.target;
    var right = 0

    var id = setInterval(frame, 10);

    function frame() {
        robotPart.style.width = right + "%";
        right++;
        if (right > 50) {
            clearInterval(id)
        }
    }
}

function rotateAndSpin(e) {
    var robotPart = e.target;
    var rotation = 0;

    var id = setInterval(frame, 20);

    function frame() {
        rotation += 5;
        robotPart.style.transform = "rotate(" + rotation + "deg)";

        if (rotation >= 180) {
            clearInterval(id);
            robotPart.style.transform = "rotate(0deg)";
        }
    }
}



function mouthTalk(e) {
    var robotPart = e.target
    var top = 60;

    var id = setInterval(frame, 10);

    function frame() {
        robotPart.style.top = top + "%";
        top++;
        if (top > 70) {
            clearInterval(id);
        }
    }
}



function Shake(e) {
    var robotPart = e.target;
    var shakeAmount = 25;
    var direction = 1;
    var shakeCount = 0;
    var maxShakes = 4;

    var id = setInterval(frame, 25);

    function frame() {
        robotPart.style.transform = "translateX(" + (direction * shakeAmount) + "px)";
        direction *= -1;

        shakeCount++;

        if (shakeCount >= maxShakes) {
            clearInterval(id);
            robotPart.style.transform = "translateX(0px)";
        }
    }
}

function rotateAndSpinFast(e) {
    var robotPart = e.target;
    var rotation = 0;

    var id = setInterval(frame, 10);

    function frame() {
        rotation += 5;
        robotPart.style.transform = "rotate(" + rotation + "deg)";

        if (rotation >= 360) {
            clearInterval(id);
            robotPart.style.transform = "rotate(15deg)";
        }
    }
}