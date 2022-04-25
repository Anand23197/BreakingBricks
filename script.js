const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const canvasH = canvas.height;
const canvasW = canvas.width;


let rightPressed = false;
let leftPressed = false;
let x,y,dx,dy, interval, radius, paddleW, paddleX, paddleY, brickW, brickoffset, brickH;
let score = 0;
let bricks = [];

 setVariable();
drawBall();
drawPaddle();
createBrickArray();
drawBricks();
drawScore();
paddleNavivation();


function drawScore(){
  ctx.beginPath();
  ctx.fillStyle = "E78EA9";
  ctx.fill();
  ctx.fillText("score: " + score, 8, 10);
  ctx.closePath();
}
function setVariable(){
        x = canvasW/2;
          y = canvasH-20;
          dx = 5;
          dy = -5;
          paddleW = 50;
      paddleX = canvasW/2-paddleW/2;
      paddleY = canvasH-10;
      radius = 10;
      brickW = 40;
      brickoffset = 8;
      brickH = 10;
 }
 
//  startGame();     
            function createBrickArray(){
                for(let j = 0; j<=3; j++){
                    bricks[j] = []
                    for(let i = 0; i<6;i++){
                        bricks[j][i] = {x:0, y:0, isVisible:true};
                    }
                }
            }

 function drawBricks(){
     for(let j = 0;j<=3;j++){
        for(let i = 0;i<6; i++){
            if(bricks[j][i].isVisible){
        const brickX = 10 + i*(brickoffset + brickW);
        const brickY = (10+brickoffset)*(j+1);
        
       bricks[j][i].x = brickX;
       bricks[j][i].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX,brickY,brickW,brickH);
        ctx.fillStyle = "yellow";
        ctx.fill();
        ctx.closePath();
    }
}
}   
}

 function paddleNavivation(){
 document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);
   
function handleKeyDown(e){
    if(e.key === "ArrowRight"){
        rightPressed = true;
    }
    if(e.key === "ArrowLeft"){
    leftPressed = true;
    }
}

function handleKeyUp(e){
    if(e.key === "ArrowRight"){
        rightPressed = false;
    }
    if(e.key === "ArrowLeft"){
    leftPressed = false;
    }
}
}

      
function detectCollision(){
    if(x + dx >= canvasW || x + dx < 0){
         dx = -dx;
     }
     if(y + dy > canvasH-radius){
     if(x + dx > paddleX && x + dx < (paddleX + paddleW)){
         dy = -dy;
         dx = dx + (x + dx - paddleX)/100;
     }
    }
     if(y + dy < 0){
         dy = -dy;
     }
              
   //  detect collision from bricks
     for(let b = 0; b<bricks.length; b++){
           for(let i = 0; i<bricks[b].length; i++){
               const brick = bricks[b][i];
               if(brick.isVisible){
               if(x > brick.x && x < (brick.x + brickW) && y > brick.y && y < (brick.y + brickH)){
                bricks[b][i].isVisible = false;       
                score++;
                dy = -dy;
                checkYouWon();
               }
               }
           }
     }
}

function checkGameOver(){
    if(y === canvasH){
         alert('game over');
         clearInterval(interval);
         interval = null;
         setVariable();
     }
 }

 function checkYouWon(){
    if(score === 24){
         alert('you won the game');
         clearInterval(interval);
         interval = null;
         setVariable();
     }
 }


 function drawBall(){
    ctx.beginPath();
 ctx.arc(x, y, radius, 0,2 * Math.PI, false)
ctx.fillStyle = "green";
ctx.fill();
 ctx.closePath();
 }

 function drawPaddle(){
    ctx.beginPath();
 ctx.rect(paddleX, paddleY, paddleW, 10);
ctx.fillStyle = "red";
ctx.fill();
 ctx.closePath();
 }

  function startGame(){
      
      if(!interval){    //if interval not having anything then only otherwise on click it will fast
    interval = setInterval(() => {
        if(rightPressed){
            paddleX = paddleX + 5;
        }
        if(leftPressed){
            paddleX = paddleX - 5;
        }
        detectCollision();
     x += dx;
     y += dy;
     
     checkGameOver();
  ctx.clearRect(0,0,canvasW, canvasH);
  drawPaddle();
   drawBall();
   drawBricks();
   drawScore();
 }, 30);
}
}
