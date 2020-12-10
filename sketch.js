let x;
let y;

let xspeed;
let yspeed;

let dvd;
let bbox;
let textHeight;

let r, g, b;

function preload() {
  dvd = loadImage('dvd_logo.png');
  font = loadFont('DS-DIGIB.TTF')
}

const textSpeed = 2
const startingMinutes = 0.2;
let timeleftSeconds = startingMinutes * 60;
let countDown = ''
let countDownFinished = false

function updateCountdown(){
  let minutes = Math.floor(timeleftSeconds / 60);
  let seconds = Math.abs(timeleftSeconds % 60);
  minutes = minutes < 10 ? '0' + minutes : minutes
  seconds = seconds < 10 ? '0' + seconds : seconds

  if(timeleftSeconds > 0 && !countDownFinished){
    countDown = `${minutes}:${seconds}`;
    timeleftSeconds --;
  }
  else{
    countDownFinished = true
    countDown = `-${minutes}:${seconds}`;
    timeleftSeconds ++;
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = random(width);
  y = random(height);
  xspeed = textSpeed;
  yspeed = textSpeed;
  textSize(30);
  textFont(font);
  bbox = font.textBounds(countDown)
  textHeight = bbox.h + 6
  pickColor();
}

function pickColor() {
  r = random(50, 256);
  g = random(50, 256);
  b = random(50, 256);
}

updateCountdown()
setInterval(updateCountdown, 1000);

function draw() {
  background(0);
  // rect(x, y, 80, 60);
  // Draw the DVD logo
  tint(r, g, b);
  fill(r, g, b);
  image(dvd, x, y);
  if(!countDownFinished){
    text(countDown, x+31, y+105);
  }
  else{
    text(countDown, x+17, y+105);
  }

  x = x + xspeed;
  y = y + yspeed;

  if (x + dvd.width >= width) {
    xspeed = -xspeed;
    x = width - dvd.width;
    pickColor();
  } else if (x <= 0) {
    xspeed = -xspeed;
    x = 0;
    pickColor();
  }

  if (y + dvd.height + textHeight>= height) {
    yspeed = -yspeed;
    y = height - dvd.height - textHeight;
    pickColor();
  } else if (y <= 0) {
    yspeed = -yspeed;
    y = 0;
    pickColor();
  }

}
