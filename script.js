//Game constants
let inputDir={x:0, y:0};
const foodSound=new Audio("food.mp3")
const gameOverSound=new Audio("gameover.mp3");
const moveSound=new Audio("move.mp3");
const musicSound=new Audio("music.mp3");
const board=document.getElementById("board");
const scored=document.getElementById("score");
const hiscorebox=document.getElementById("hiscorebox");
let speed=5;
let score=0;
let lastTime=0;
let snakeArray=[{x:9, y:9}];
let food={x:Math.round(2+14*Math.random()), y:Math.round(2+14*Math.random())};
//Functions
musicSound.play();
function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime-lastTime)/1000<1/speed){
        return;
    }
    lastTime=ctime;
    gameEngine();
}

function isCollide(snakeArray){
    //if snake bumps into itself
    for(let i=1;i<snakeArray.length;i++){
        if(snakeArray[0].x===snakeArray[i].x && snakeArray[0].y===snakeArray[i].y){
            return true;
        }
    }
    if((snakeArray[0].x>=18 || snakeArray[0].x<=0) || (snakeArray[0].y>=18 || snakeArray[0].y<=0)){
        return true;
    }
}

function gameEngine(){
    //updating snake variable
    if(isCollide(snakeArray)){
        gameOverSound.play();
        musicSound.pause();
        inputDir={x:0, y:0};
        alert("Game Over. Press any key to play again!");
        snakeArray=[{x:9, y:9}];
        musicSound.play();
        score=0;
    }
    //if you have eaten the food, increment score and regenerate food
    if(snakeArray[0].y===food.y && snakeArray[0].x===food.x){
        score+=1;
        if(score>hiscoreval){
            hiscoreval=score
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscorebox.innerHTML="High Score: "+hiscoreval;
        }
        scored.innerHTML="Score: "+score;
        foodSound.play();
        snakeArray.unshift({x:snakeArray[0].x+inputDir.x, y:snakeArray[0].y+inputDir.y});
        let a=2;
        let b=16;
        food={x:Math.round(a+(b-a)*Math.random()), y:Math.round(a+(b-a)*Math.random())};
    }

    //moving the snake
    for(let i=snakeArray.length-2;i>=0;i--){
        const ele=snakeArray[i];
        snakeArray[i+1]={...snakeArray[i]};
    }
    snakeArray[0].x+=inputDir.x;
    snakeArray[0].y+=inputDir.y;

    //display the snake and food
    board.innerHTML="";
    snakeArray.forEach(function(e, index){
        snakeElement=document.createElement("div");
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index===0){
            snakeElement.classList.add("head");
        }
        else{
            snakeElement.classList.add("snake");
        }
        board.appendChild(snakeElement);
    });
    foodElement=document.createElement("div");
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
}

//Main logic
let hiscore=localStorage.getItem("hiscore");
let hiscoreval=0;
if(hiscore===null){
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
}
else{
    hiscoreval=JSON.parse(hiscore);
    hiscorebox.innerHTML="High Score: "+hiscoreval;
}
window.requestAnimationFrame(main);
window.addEventListener("keydown", function(e){
    inputDir={x:0, y:1};
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            console.log("UP");
            inputDir.x=0;
            inputDir.y=-1;
            break;
        case "ArrowDown":
            console.log("DOWN");
            inputDir.x=0;
            inputDir.y=1;
            break;
        case "ArrowLeft":
            console.log("LEFT");
            inputDir.x=-1;
            inputDir.y=0;
                break;
        case "ArrowRight":
            console.log("RIGHT");
            inputDir.x=1;
            inputDir.y=0;
            break;
        default:
            console.log(NONE);
            break;
    }
})