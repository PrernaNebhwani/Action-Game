score=0;
cross=true;
gameRunning = true;
let musicStarted = false;
// console.log("script loaded");
audio=new Audio('music.mp3');
audioGameOver=new Audio('gameover.mp3');
document.onkeydown = function (e) {
   if (!musicStarted) {
        audio.play();
        musicStarted = true;
    }
    console.log("Key:", e.key);
    console.log("Code:", e.code);
    if(e.code=='ArrowUp'){
        player=document.querySelector('.player');
        player.classList.add('animateplayer');
        setTimeout(() => {
          player.classList.remove('animateplayer');
        },700);     
     }
     if(e.code=='ArrowRight'){
       player=document.querySelector('.player');
       playerX=parseInt(window.getComputedStyle(player,null).getPropertyValue('left'));
       player.style.left=(playerX+112) + "px";
     }
     if(e.code=='ArrowLeft'){
       player=document.querySelector('.player');
       playerX=parseInt(window.getComputedStyle(player,null).getPropertyValue('left'));
       player.style.left=(playerX-112) + "px";
     }
}
//game logic
let scoreInterval=setInterval(() => {
        dino=document.querySelector('.dino');
        gameOver=document.querySelector('.gameOver');
        player=document.querySelector('.player');
        //to detect collision
        px=parseInt(window.getComputedStyle(player,null).getPropertyValue('left'));
        py=parseInt(window.getComputedStyle(player,null).getPropertyValue('top'));

        dx=parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
        dy=parseInt(window.getComputedStyle(dino,null).getPropertyValue('top'));

        offsetX=Math.abs(px-dx);
        offsetY=Math.abs(py-dy);
        if(offsetX<93 && offsetY<52){
                gameOver.style.visibility='visible';
                dino.classList.remove('dinoAni');
                audioGameOver.play();
                setTimeout(() => {
                  audioGameOver.pause();      
                  audio.pause();
                },1000)
                GameOver();
        } 
        else if(offsetX<105 && cross){
           score+=1;
           updateScore(score);
           cross=false;
           setTimeout(()=>{
             cross=true;
           },1000);
           setTimeout(() => {
                aniDur=parseFloat(window.getComputedStyle(dino,null).getPropertyValue('animation-duration'));
                newDur=aniDur-0.1;
                dino.style.animationDuration= newDur + 's';
           },500);
        }
},100);
//for incrementing score
function updateScore(score){
      document.getElementById('score-container').innerHTML = "Your score: " + score; 
}
//to add fall feature
function GameOver(){
    player=document.querySelector('.player');
    gameRunning = false;
    void player.offsetWidth;
    player.classList.add('fall');
    clearInterval(scoreInterval);
}
