let fireworks = true;
let frRate = 10;
let canvasSize = 800;
let bgColour = "#103783";
let bg, firework;
let debugging = false;

function setup() {
  bg = createGraphics(canvasSize, canvasSize);
  createCanvas(canvasSize, canvasSize);
  bg.background(bgColour);
  drawStars(bg);
  drawMoon(bg);
  drawCity(bg, int(canvasSize/20), int(canvasSize/20), int(canvasSize*0.2), 0, 6);
  image(bg, 0, 0);
}

function draw() {
  frameRate(frRate);
  let twoSeconds = frRate * 2;
  let modulo = frameCount % twoSeconds;

  // Frame rate text box (debugging only)
  if (debugging) {
    fill("white");
    noStroke();
    rect(0, 0, 40);
    fill("black");
    textSize(20);
    text(modulo, 5, 30);
  }

  if (modulo == 1) {
    let randomColour = color(random(0, 255), random(0, 255), random(0, 255));
    let randomCentreX = random(20, canvasSize - 20);
    let randomCentreY = random(20, canvasSize / 2 - 20);
    firework = new Firework((canvasSize/20), randomColour, randomCentreX, randomCentreY);
    firework.drawFrame(modulo);
  }
  if(modulo > 1 && modulo < 6){
    firework.drawFrame(modulo);
  }
  
  if (modulo == 6) {
    // redraw the canvas.
    clear();
    image(bg, 0, 0);
  }
}

function drawStars(bg) {
  for (let num = 0; num < 50; num++) {
    bg.stroke("white");
    bg.strokeWeight(random(1, 3));
    bg.point(random(canvasSize), random(canvasSize - (canvasSize/10)));
  }
}

function drawMoon(bg) {
  bg.stroke("white");
  bg.circle(random(0, canvasSize - int(canvasSize/10)), random(int(canvasSize/10), int(canvasSize/4)), int(canvasSize/10));
}

function drawCity(bg, spacing, minHeight, maxHeight, minLights, maxLights) {
  bg.fill("black");
  for (let col = 0; col < canvasSize * spacing; col++) {
    let buildingHeight = random(minHeight, maxHeight);
    bg.noStroke();
    bg.rect(col * spacing, height - buildingHeight, spacing, buildingHeight);
    // add a random number of lights.
    let numLights = map(
      buildingHeight + random((buildingHeight * -1) / 10, buildingHeight / 10),
      minHeight,
      maxHeight,
      minLights,
      maxLights
    );
    for (let light = 0; light < numLights; light++) {
      bg.stroke("yellow");
      bg.strokeWeight(int(canvasSize*0.005));
      bg.point(
        random(col * spacing + 5, col * spacing + spacing - 5),
        random(height - buildingHeight + 5, height - 5)
      );
    }
  }
}

class Firework {
  constructor(size, colour, centreX, centreY) {
    this.size = size;
    this.colour = colour;
    this.centreX = centreX;
    this.centreY = centreY;
  }

  drawCentre(colour) {
    // Centre of firework
    noStroke();
    fill(colour);
    circle(this.centreX, this.centreY, this.size);
  }

  firstRing(colour) {
    noFill();
    stroke(colour);
    strokeWeight(5);
    circle(this.centreX, this.centreY, this.size * 2);
  }

  secondRing(colour) {
    noFill();
    stroke(colour);
    strokeWeight(5);
    circle(this.centreX, this.centreY, this.size * 3);
  }

  drawFrame(frame) {
    let fadedColour1 = lerpColor(this.colour, color("#103783"), 0.5);
    let fadedColour2 = lerpColor(this.colour, color("#103783"), 0.75);

    switch (frame) {
      case 1:
        this.drawCentre(this.colour);
        break;
      case 2:
        this.drawCentre(fadedColour1);
        this.firstRing(this.colour);
        break;
      case 3:
        this.drawCentre(fadedColour2);
        this.firstRing(fadedColour1);
        this.secondRing(this.colour);
        break;
      case 4:
        this.firstRing(fadedColour2);
        this.secondRing(fadedColour1);
        break;
      case 5:
        this.secondRing(fadedColour2);
        break;
      default:
          
    }
  }
}
