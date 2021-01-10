
var character = document.getElementById("character");
var game = document.getElementById("game");
var liveScore = document.getElementById("score");
var interval;
var both = 0;
var counter = 0;
var currentBlocks = [];
var paused = true;
var gameSpeed = 0; if(!paused) gameSpeed = 0.5;
var ballSpeed = 2;
var savedSpeed = gameSpeed ? !paused : 0.5;
var music = document.getElementById("music");

if(!paused)
    music.play();

function trackScore() {
    var color = window.getComputedStyle(liveScore).getPropertyValue("color");
    var trackedScore = counter - 4;
    var calc = liveScore.innerHTML = "Score:\n" + trackedScore;
    if(trackedScore === 20)
        gameSpeed = 0.55;
    if(trackedScore === 40)
        gameSpeed = 0.57;
    if(trackedScore === 50)
        character.style.backgroundColor = "d8d8d8";
    if(trackedScore === 80)
        gameSpeed = 0.6;
    if(trackedScore === 100){
        gameSpeed = 0.65;
        liveScore.style.color = "yellow";
        character.style.backgroundColor = "#acacac";
    }
    if(trackedScore === 150){
        gameSpeed = 0.67;
        character.backgroundColor = "#acacac";
    }
    if(trackedScore === 200) {
        gameSpeed = 0.7;
        ballSpeed = 2.5;
        character.style.backgroundColor = "8d8d8d";
    }
    if(trackedScore === 250)
        character.style.backgroundColor = "777777";
    if(trackedScore === 300) {
        gameSpeed = 0.8;
        ballSpeed = 2.7;
        liveScore.style.color = "orange";
    }
    if(trackedScore === 350)
        character.style.backgroundColor = "525252";
    if(trackedScore === 400) {
        gameSpeed = 0.9;
        ballSpeed = 3.2;
    }
    if(trackedScore === 450)
        character.style.backgroundColor = "d8d8d8";
    if(trackedScore === 500) {
        gameSpeed = 1;
        ballSpeed = 7;
        liveScore.style.color = "red";
    }
}

function moveLeft() {
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if (left > 0 && !paused) {
        character.style.left = left - ballSpeed + "px";
    }
}
function moveRight() {
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if (left < 380 && !paused) {
        character.style.left = left + ballSpeed + "px";
    }
}
document.addEventListener("keydown", event => {
        if (event.keyCode == 32) {
            if(paused){
                playGame();
            }       
            else{
                pauseGame();
            }
        }
        if (both == 0) {
        both++;
        if (event.key === "ArrowLeft") {
            interval = setInterval(moveLeft, 1);
        }
        if (event.key === "ArrowRight") {
            interval = setInterval(moveRight, 1);        
        }
        if (event.keyCode == 65) {
            interval = setInterval(moveLeft, 1);
        }
        if (event.keyCode == 68) {
            interval = setInterval(moveRight, 1);        
        }

    }
});
document.addEventListener("keyup", event => {
    clearInterval(interval);
    both = 0;
});
var blocks = setInterval(function () {
    var blockLast = document.getElementById("block" + (counter - 1));
    var holeLast = document.getElementById("hole" + (counter - 1));
    if (counter > 0) {
        var blockLastTop = parseInt(window.getComputedStyle(blockLast).getPropertyValue("top"));
        var holeLastTop = parseInt(window.getComputedStyle(holeLast).getPropertyValue("top"));
    }
    if (blockLastTop < 400 || counter == 0) {
        var block = document.createElement("div");
        var hole = document.createElement("div");
        block.setAttribute("class", "block");
        hole.setAttribute("class", "hole");
        block.setAttribute("id", "block" + counter);
        hole.setAttribute("id", "hole" + counter);
        block.style.top = blockLastTop + 100 + "px";
        hole.style.top = holeLastTop + 100 + "px";
        var random = Math.floor(Math.random() * 360);
        hole.style.left = random + "px";
        game.appendChild(block);
        game.appendChild(hole);
        currentBlocks.push(counter);
        counter++;
    }
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    var characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    var drop = 0;
    while (true) {
        trackScore();
        break;
    }
    if (characterTop <= 0) {
        if(confirm("Game over. Do you want to play again?") == true) {
            clearInterval(blocks);
            location.reload();
        }
        else {
            
        }           
    }
    for (var i = 0; i < currentBlocks.length; i++) {
        let current = currentBlocks[i];
        let iblock = document.getElementById("block" + current);
        let ihole = document.getElementById("hole" + current);
        let iblockTop = parseFloat(window.getComputedStyle(iblock).getPropertyValue("top"));
        let iholeLeft = parseFloat(window.getComputedStyle(ihole).getPropertyValue("left"));
        iblock.style.top = iblockTop - gameSpeed + "px";
        ihole.style.top = iblockTop - gameSpeed + "px";
        document.getElementById("play").onclick = function() {playGame();}
        document.getElementById("pause").onclick = function(){pauseGame();}

        if (iblockTop < -20) {
            currentBlocks.shift();
            iblock.remove();
            ihole.remove();
        }
        if (iblockTop - 20 < characterTop && iblockTop > characterTop) {
            drop++;
            if (iholeLeft <= characterLeft && iholeLeft + 20 >= characterLeft) {
                drop = 0;
            }
        }
    }
    if (drop == 0) {
        if (characterTop < 480) {
            character.style.top = characterTop + 2 + "px";
        }
    } else {
        character.style.top = characterTop - 0.5 + "px";
    }
}, 1);

function pauseGame() {
    savedSpeed = gameSpeed;
    document.getElementById("pause").style.visibility = 'hidden';
    document.getElementById("play").style.visibility = 'visible';
    gameSpeed = 0;
    paused = true;
}
function playGame() {
    document.getElementById("play").style.visibility = 'hidden';
    document.getElementById("pause").style.visibility = 'visible';
    gameSpeed = savedSpeed;
    paused = false;
}