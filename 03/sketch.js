function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(10);
}

function draw() {
  background(70, 80);
  drawElements();
}

function drawElements() {
  let num = 9;
  push();
  translate(width / 2, height / 2);

  let cir = 360 / num * (frameCount%num);
  rotate(radians(cir));
  noStroke();
  fill(236, 51, 208);
  ellipse(35, 0, 22, 22);
  pop();
  stroke(236, 51, 208, 72 * sin(frameCount));

  // static lines
  line(60, 0, 60, height);
  line(width - 60, 0, width - 60, height);
  line(0, 60, width, 60);
  line(0, height - 60, width, height - 60);

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}