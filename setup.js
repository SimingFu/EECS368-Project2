function Ball(x,y){
  this.x1 = x;
  this.y1 = y;
  this.x2 = x;
  this.y2 = y;
  this.falling = 0;
  this.renew = function() {
    return (this.y1 + (this.y2 - this.y1) * this.falling / 50)*60 + 100;
  }
  this.changeBall = function(x2, y2, color){
    this.x2 = x2;
    this.y2 = y2;
    this.color = color;
    this.moving = true;
    this.falling = 25;
    move.push(this);
  }
  this.update = function (){
    this.falling--;
    if (this.falling <= 0){
      this.moving = false;
    }
  }
}
function checkColor(x, y ,color){
  var check = true;
  if (x > 1){
    var color0 = ball[x-2][y].color;
    var color1 = ball[x-1][y].color;
    if (color0 == color1 && color1 == color){
      check = false;
    }
  }
  if (y > 1){
    var color0 = ball[x][y-2].color;
    var color1 = ball[x][y-1].color;
    if (color0 == color1 && color1 == color){
      check = false;
    }
  }
  return check;
}
function Remove(){
  for (let x=0; x<10; x++){
    var color0 = ball[x][0].color;
    var count = 1;
    for (let y=1; y<10; y++){
      var color1 = ball[x][y].color;
      if (color0 == color1){
        count ++;
        if (count >= 3){
          ball[x][y-2].remove = true;
          ball[x][y-1].remove = true;
          ball[x][y].remove = true;
        }
      }
      else{
        color0 = color1;
        count = 1;
      }
    }
  }
  for (let y=0; y<10; y++){
    var color0 = ball[0][y].color;
    var count = 1;
    for (let x=1; x<10; x++){
      var color1 = ball[x][y].color;
      if (color0 == color1){
        count ++;
        if (count >= 3){
          ball[x-2][y].remove = true;
          ball[x-1][y].remove = true;
          ball[x][y].remove = true;
        }
      }
      else{
        color0 = color1;
        count = 1;
      }
    }
  }
}
function fall(){
  for (let x=0; x<10; x++){
    for (let y=9, z=9; y>=0; y--, z--){
      while (z>=0){
        if (ball[x][y].remove){
          z--;
        }
        else{
          break;
        }
      }
      if (y != z){
        var ballcolor = (z >= 0) ? ball[x][y].color : getRandomNum();
        ball[x][y].changeBall(x, z, ballcolor);
      }
    }
  }
  for (let x=0; x<10; x++){
    for (let y=0; y<10; y++){
      if (ball[x][y].remove){
        ball[x][y].remove = false;
        score += 10;
      }
    }
  }
}
function myMouseDown(e){
  mouseDownX = e.offsetX;
  mouseDownY = e.offsetY;
}
function myMouseUp(e){
  var ballX1 = Math.floor(mouseDownX / 60);
  var ballY1 = Math.floor((mouseDownY-100) / 60);
  var ballX2 = ballX1;
  var ballY2 = ballY1;
  var mouseUpX = e.offsetX;
  var mouseUpY = e.offsetY;
  if (Math.abs(mouseUpX - mouseDownX) == 0 && Math.abs(mouseUpY - mouseDownY) == 0){
    return;
  }
  else if (Math.abs(mouseUpX - mouseDownX) > Math.abs(mouseUpY - mouseDownY)){
    ballX2 += (mouseUpX - mouseDownX > 0) ? 1: -1;
  }
  else{
    ballY2 += (mouseUpY - mouseDownY > 0) ? 1: -1;
  }
  if (ball[ballX1][ballY1].moving || ball[ballX2][ballY2].moving || timer == null){
    return;
  }
  var ballColor = ball[ballX1][ballY1].color;
  ball[ballX1][ballY1].changeBall(ballX2, ballY2, ball[ballX2][ballY2].color);
  ball[ballX2][ballY2].changeBall(ballX1, ballY1, ballColor);
  remainMove--;
  draw();
}
function getRandomNum(){
  return Math.floor(Math.random() * 6);
}
function gameOver(){
  ctx.clearRect(0, 0, 600, 700);
  startBtn.innerHTML = "Again";
  startBtn.style.display = "inline";
  ctx.font = 'bold 30px Open Sans';
  ctx.fillText('Score: '+score, 300, 250);
}
