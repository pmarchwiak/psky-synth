const WHITE_KEY_WIDTH = 50;
const WHITE_KEY_HEIGHT = 150; 
const BLACK_KEY_WIDTH = 30;
const BLACK_KEY_HEIGHT = 100;

class Key {
  constructor(noteName, freq, x, isWhite) {
    this.noteName = noteName;
    this.freq = freq;
    this.x = x;
    this.isWhite = isWhite;
  }
}

const keyboard = [
  new Key('c', 261.63, 25, true),
  new Key('c#', 277.18, 25, true),
  new Key('d', 293.66, 25, true),
  new Key('d#', 311.13, 25, true),
  new Key('e', 329.63, 25, true),
  new Key('f', 349.23, 25, true),
  new Key('f#', 369.99, 25, true),
  new Key('g', 392, 25, true),
  new Key('g#', 415.3, 25, true),
  new Key('a', 440, 25, true),
  new Key('a#', 466.16, 25, true),
  new Key('b', 493.88, 25, true)
];

function setup() {
  createCanvas(400, 400);
  textFont('Baskerville', 25)
  text('a little synth', 30, 30);
}

function draw() {

  // background(220);
  
  // white keys
  fill('white');
  for (let i = 0; i < 7; i++) {
    rect(i*50+25,200,50,150);
  }
  
  // black keys
  fill('black');
  rect(60,200,30,100);
  rect(110,200,30,100);
  rect(210,200,30,100);
  rect(260,200,30,100);
  rect(310,200,30,100);
}