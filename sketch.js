let pos1;
let pos2;
let vel1;
let vel2;
let ac1;
let ac2;
let r1;
let r2;
let m1;
let m2;
let a1;
let a2;
let g = 1;

var canvas;
var cx;
var cy;

var precPos;
var display = false;

function setup()
{
  createCanvas(800, 800);
  canvas = createGraphics(width, height);
  cx = width / 2;
  cy = height / 2;

  r1 = 100;
  r2 = 200;
  m1 = 10;
  m2 = 10;
  a1 = PI;
  a2 = PI + radians(1);

  vel1 = 0;
  vel2 = 0;
  ac1 = 0.00;
  ac2 = 0.00;

  pos1 = createVector(0, r1);
  pos2 = p5.Vector.add(pos1, createVector(0, r2));

  precPos = createVector(pos2.x, pos2.y);

  update();

}

function draw()
{
  background(50);
  stroke(255);
  fill(0, 0, 255);
  translate(cx, cy);

  line(pos1.x, pos1.y, 0, 0);
  ellipse(pos1.x, pos1.y, 10, 10);

  line(pos2.x, pos2.y, pos1.x, pos1.y);
  ellipse(pos2.x, pos2.y, 10, 10);

  canvas.push();
  canvas.translate(cx, cy);
  canvas.stroke(255);
  canvas.strokeWeight(2)
  if (display)
    canvas.line(pos2.x, pos2.y, precPos.x, precPos.y);
  canvas.pop();

  image(canvas, -cx, -cy)

  precPos.x = pos2.x;
  precPos.y = pos2.y;

  update();
  display = true;
}

function update()
{
  //formulae from:
  //https://www.myphysicslab.com/pendulum/double-pendulum-en.html

  ac1 = ((-g * ((2 * m1) + m2) * sin(a1)) - (m2 * g * sin(a1 - (2 * a2))) - (2 * sin(a1 - a2) * m2 * ((vel2 * vel2 * r2) + (vel1 * vel1 * r1 * cos(a1 - a2))))) / (r1 * ((2 * m1) + m2 - (m2 * cos(2 * a1 - 2 * a2))));

  ac2 = ((2 * sin(a1 - a2)) * ((vel1 * vel1 * r1 * (m1 + m2)) + (g * (m1 + m2) * cos(a1)) + (vel2 * vel2 * r2 * m2 * cos(a1 - a2)))) / (r2 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2)));

  vel1 += ac1;
  vel2 += ac2;

  vel1 *= 0.999;
  vel2 *= 0.999;

  a1 += vel1;
  a2 += vel2;

  pos1.x = r1 * sin(a1);
  pos1.y = r1 * cos(a1);

  pos2.x = pos1.x + r2 * sin(a2);
  pos2.y = pos1.y + r2 * cos(a2);

}