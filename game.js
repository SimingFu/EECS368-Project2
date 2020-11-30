function init(){
  startBtn.style.display = "none";
  var canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  canvas.onmousedown = myMouseDown;
  canvas.onmouseup = myMouseUp;
  timer = setInterval(checkBall, 10);
  remainMove = 20;
  score = 0;
  for (let x=0; x<10; x++){
    ball[x] = [];
    for (let y=0; y<10; y++){
      ball[x][y] = new Ball(x,y);
    }
  }
  for (let x=0; x<10; x++){
    for (let y=0; y<10; y++){
      while(true){
        var ballcolor = getRandomNum();
        if (checkColor(x, y, ballcolor)){
          ball[x][y].color = ballcolor;
          break;
        }
      }
    }
  }
}
function draw(){
  ctx.clearRect(0, 0, 600, 700);
  for (let x=0; x<10; x++){
    for (let y=0; y<10; y++){
      ctx.drawImage(colorlist[ball[x][y].color], x*60, ball[x][y].renew(), 60, 60);
    }
  }
  ctx.font = 'bold 20px Open Sans';
  ctx.textAlign = 'center';
  ctx.fillText ('Move Left: '+remainMove, 150, 50);
  ctx.fillText ('Score: '+score, 450, 50);
}
function checkBall(){
  if (move.length > 0){
    for (var i=0; i<move.length; i++){
      move[i].update();
    }
    move = move.filter(
      function(ball){
        return ball.falling !=0;
      }
    );
    if (move.length == 0){
      Remove();
      fall();
    }
  }
  draw();
  if (move.length == 0 && remainMove == 0){
    clearInterval(timer);
    timer = null;
    setTimeout('gameOver()', 300);
  }
}
