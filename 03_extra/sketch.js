let xDim = 1000; //canvas size-width
let yDim = 600; //canvas size-height
let timer = 0;
let speed = 100; //the speed of rotating , default 100
let maxSentences = 77; //original: 77
let sentences = 0;
let xPos = [1, 2, 3, 4, 5, 6, 7, 8]; //original: 8 columns
let yPos = [1, 2, 3, 4, 5]; //original: 5 rows
let xCtr = 0;
let yCtr = 0;
let waitTime = 10000;
let itr = 0; // no. of iteration
let milliStart = 0;
let currentMillis;
let fillColor;

function setup() {
  createCanvas(xDim, yDim);
  background(240);
  /*calculate the x-position of each asterisk as
  an array (xPos[]) that starts with an array index[0]*/
  for (let i = 0; i < xPos.length; i++) {
    xPos[i] = xPos[i] * (xDim / (xPos.length + 1));
  }
  /*calculate the y-position of each asterisk as
  an array (ypos[]) that starts with an array index[0]*/
  for (let i = 0; i < yPos.length; i++) {
    yPos[i] = yPos[i] * (yDim / (yPos.length + 1));
  }
  fill(0); //counter color at the bottom left
  textAlign(LEFT, CENTER);
  text(itr, 10, yDim - 30); //display counter
  fillColor = color(
    floor(random(0, 255)), floor(random(0, 255)), floor(random(0, 255))
  );
}

function draw() {
  //millis means millsecond since starting the program, like frameCount
  currentMillis = floor(millis() - milliStart);
  if (currentMillis > timer) {
    push()
    translate(xPos[xCtr], yPos[yCtr]); //rows and cols
    rotate(radians((360 / 8) * (millis() / speed))); //rotate in itself
    timer = currentMillis + speed; //the time for the next loop
    textSize(12);
    fill(fillColor);
    /* about the time string written in the form of an asterisk,
    and it starts with 0 always.
    nf:format numbers into strings and adds zeros in front
    [https://p5js.org/reference/#/p5/nf]
    3 digits in front and 0 digit after the decimal. */
    text(nf(currentMillis, 6), 3, 0);
    sentences++;
    if (sentences >= maxSentences) { //reach the max for each asterisk
      xCtr++; //move to next array
      //meet max cols, and need to go to next row
      if (xCtr >= xPos.length) {
        xCtr = 0;
        yCtr++; //next row
        /* the program reaches the max no. of rows on a screen
        (i.e after reaching the no. of max cols); the screen is
        filled > reset everything and update the counter*/
        if (yCtr >= yPos.length) {
          yCtr = 0;
          background(240);
          //add counter (iteration)
          itr++;
          pop();
          //counter's display color
          fill(0);
          //change the counter display again
          text(itr, 10, yDim - 30);
          //wait for next round for starting the first asterisk
          let wait = floor(millis() + waitTime);
          while (millis() < wait) {}
          //reset the starting time
          milliStart = millis();
          //reset the timer
          timer = 0;
          push();
        }
      }
      sentences = 0;
      fillColor = color(
        floor(random(0, 255)), floor(random(0, 255)), floor(random(0, 255)));
    }
    pop(); //restore previous state
  }
}