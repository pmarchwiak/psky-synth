const WHITE_KEY_WIDTH = 50;
const WHITE_KEY_HEIGHT = 150; 
const BLACK_KEY_WIDTH = 30;
const BLACK_KEY_HEIGHT = 100;
const KEYBOARD_START_Y = 200;

class Key {
  constructor(noteName, freq, x) {
    this.noteName = noteName;
    this.freq = freq;
    this.x = x;
  }
  
  isWhite() {
    return !this.noteName.includes('#');
  }
}

const keyboard = [
  new Key('C4', 261.63, 25),
  new Key('C#4', 277.18, 60),
  new Key('D4', 293.66, 75),
  new Key('D#4', 311.13, 110),
  new Key('E4', 329.63, 125),
  new Key('F4', 349.23, 175),
  new Key('F#4', 369.99, 210),
  new Key('G4', 392, 225),
  new Key('G#4', 415.3, 260),
  new Key('A4', 440, 275),
  new Key('A#4', 466.16, 310),
  new Key('B4', 493.88, 325)
];

function getMouseKey() {
  if (mouseX < keyboard[0].x || mouseX > keyboard[keyboard.length-1]) {
    return null;
  }
  if (mouseY < KEYBOARD_START_Y || mouseY > (KEYBOARD_START_Y + WHITE_KEY_HEIGHT)) {
    return null;
  }

  for (let i = 0; i < keyboard.length; i++) {
    fill('aqua');
    circle(mouseX, mouseY, 20);

    if (i === keyboard.length - 1) {
      return keyboard[i];
    }
    const curKey = keyboard[i];
    const nextKey = keyboard[i+1];
    if (curKey.isWhite() && nextKey.isWhite()) {
      if (mouseX > curKey.x && mouseX < curKey.x + WHITE_KEY_WIDTH) {
        return keyboard[i];
      }
    }
    else if (curKey.isWhite() && !nextKey.isWhite()) {
      if (mouseY > (KEYBOARD_START_Y + BLACK_KEY_HEIGHT) 
          && mouseX > curKey.x && mouseX < curKey.x + WHITE_KEY_WIDTH) {
        return keyboard[i];
      }
      else if (mouseY < (KEYBOARD_START_Y + BLACK_KEY_HEIGHT)
                && mouseX > curKey.x && mouseX < nextKey.x) {
        return keyboard[i];
      }
      else if (mouseY < (KEYBOARD_START_Y + BLACK_KEY_HEIGHT)
               && mouseX > nextKey.x && mouseX < nextKey.x + BLACK_KEY_WIDTH) {
        return keyboard[i+1];
      }
    }
  }
}

let playing;

function setup() {
  createCanvas(400, 400);
  osc = new p5.Oscillator('sine');
}

function draw() {

  background('aqua');
  fill('black');
  textFont('Baskerville', 25)
  text('a little synth', 30, 50);
  
  // white keys
  for (let key of keyboard) {
    if (key.isWhite()) {
      fill('white');
      rect(key.x, KEYBOARD_START_Y, WHITE_KEY_WIDTH, WHITE_KEY_HEIGHT);
    }
  }

  // black keys 
  for (let key of keyboard) {
    if (!key.isWhite()) {
      fill('black');
      rect(key.x, KEYBOARD_START_Y, BLACK_KEY_WIDTH, BLACK_KEY_HEIGHT);
    }
  }

  if (mouseIsPressed) {
    let key = getMouseKey();
    if (key) {
      if (!playing) {
        osc.start();
        playing = true;
      }
      osc.freq(key.freq);
      osc.amp(1.0, 0.5);

      fill('black');
      textFont('Baskerville', 12);
      text(`note: ${key.noteName}, pl: ${playing}`, 300, 380);
    }
  }

  // fill('white');
  // for (let i = 0; i < 7; i++) {
  //   rect(i*50+25,200,50,150);
  // }
  
  // // black keys
  // fill('black');
  // rect(60,200,30,100);
  // rect(110,200,30,100);
  // rect(210,200,30,100);
  // rect(260,200,30,100);
  // rect(310,200,30,100);
}

function mouseReleased() {
  osc.amp(0, 0.7);
  playing = false;
}