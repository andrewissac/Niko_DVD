let x;
let y;

let xspeed;
let yspeed;

let dvd;
let bbox;
let textHeight;

var pepe;
let r, g, b;

function preload() {
  dvd = loadImage('bouncink_v2_w200.png');
  pepe = loadImage('pepedance_transparent.gif')
  font = loadFont('DS-DIGIB.TTF');
}


// NIKO PARAMETER
var pepescale = 0.23
const textSpeed = 2
const startingMinutes = 5;


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
  textSize(42);
  textFont(font);
  bbox = font.textBounds(countDown)
  textHeight = bbox.h + 6

  pepe.width = pepe.width * pepescale;
  pepe.height = pepe.height * pepescale;

  colorMode(HSL, 360, 100, 100)
  pickColor();
}

function pickColor() {
  h = random(0, 360);
}

updateCountdown()
setInterval(updateCountdown, 1000);

function draw() {
  background(0);
  tint(h, 100, 70);
  fill(h, 100, 70);
  image(dvd, x, y);
  if(!countDownFinished){
    text(countDown, x+58, y+168);
  }
  else{
    text(countDown, x+38, y+168);
    noTint();
    image(pepe,x+23,y+50);
    tint(h, 100, 70)
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
