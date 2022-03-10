// Configuration vars
let numOfSquares = 12;
let canvasSize = 800;
let chanceForCommon = 0.9;
let showGrid = false;

// Other vars
let squareSize = canvasSize / numOfSquares;
let paused = false;
let commonImgArr, rareImgArr;

function preload(){  
  commonImgArr = [
    loadImage('assets/img1.jpg'),
    loadImage('assets/img3.jpg'), 
    loadImage('assets/img4.jpg'), 
   
  ];
  
  rareImgArr = [
    loadImage('assets/img2.jpg'), 
    loadImage('assets/img5.jpg'),
    loadImage('assets/img6.jpg'),
    loadImage('assets/img7.jpg'),
  ];
}

function setup() {
  createCanvas(canvasSize, canvasSize);
  tint('#E4DFDA');
}

function draw() {
  frameRate(1);
  if(!paused){
    generateBoard(squareSize);
  }
}

function generateBoard(squareSize){
  for(let col=0; col<numOfSquares; col++){
    for(let row=0; row<numOfSquares; row++){
      if(showGrid){
        noFill();
        strokeWeight(1);
        stroke(150);
        square(row*squareSize, col*squareSize, squareSize);
      }
      
      let randFloat = random();
      if(randFloat <= chanceForCommon){
        image(commonImgArr[int(random(0, commonImgArr.length))], row*squareSize, col*squareSize, squareSize, squareSize);
      }
      else {
        image(rareImgArr[int(random(0, rareImgArr.length))], row*squareSize, col*squareSize, squareSize, squareSize);
      }
    }
  }
  // draw border
  
  noFill();
  strokeWeight(10);
  stroke(0);
  square(0, 0, canvasSize);
}

function mouseClicked(){
  paused = !paused;
}
