const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var canvas;
var player, playerBase, playerArcher;
var playerArrows = [];
var boards = [];


function preload() {
  backgroundImg = loadImage("./assets/background.png");
  baseimage = loadImage("./assets/base.png");
  playerimage = loadImage("./assets/player.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  engine = Engine.create();
  world = engine.world;

  angleMode(DEGREES);

  var options = {
    isStatic: true
  };

  playerBase = Bodies.rectangle(200, 350, 180, 150, options);
  World.add(world, playerBase);

  player = Bodies.rectangle(250, playerBase.position.y - 160, 50, 180, options);
  World.add(world,player)

  playerArcher = new PlayerArcher(
    340,
    playerBase.position.y - 112,
    120,
    120
  );
}

function draw() {
  background(backgroundImg);

  Engine.update(engine);
  image(baseimage,playerBase.position.x,playerBase.position.y,180,150)
  image(playerimage,player.position.x,player.position.y,50,180)

  playerArcher.display();
  showBoards();



  for (var i = 0; i < playerArrows.length; i++) {
    if (playerArrows[i] !== undefined) {
      playerArrows[i].display();
      collisionWithBoard(i);

    }
  }

  // Title
  fill("#FFFF");
  textAlign("center");
  textSize(40);
  text("EPIC ARCHERY", width / 2, 100);
}



function keyPressed() {
  if (keyCode === 32) {
    var posX = playerArcher.body.position.x;
    var posY = playerArcher.body.position.y;
    var angle = playerArcher.body.angle;
    //console.log(angle);

    var arrow = new PlayerArrow(posX, posY, 100, 10, angle);

    Matter.Body.setAngle(arrow.body, angle);
    playerArrows.push(arrow);
  }
}

function keyReleased() {
  if (keyCode === 32) {
    if (playerArrows.length) {
      var angle = playerArcher.body.angle;
      playerArrows[playerArrows.length - 1].shoot(angle);
    }
  }
}


function showBoards() {
  if (boards.length > 0) {
    if (
      boards[boards.length - 1] === undefined ||
      boards[boards.length - 1].body.position.x < width - 300
    ) {
      var positions = [-200, -400, -600, -200];
      var position = random(positions);
      var board = new Board(width, height - 100, 170, 170, position);

      boards.push(board);
    }

    for (var i = 0; i < boards.length; i++) {
      if (boards[i]) {
        Matter.Body.setVelocity(boards[i].body, {
          x: -0.9,
          y: 0
        });

        boards[i].display();
      } 
    }
  } else {
    var board = new Board(width, height - 60, 170, 170, -60);
    boards.push(board);
  }
}

function collisionWithBoard(index){
  for(var i = 0; i < boards.length; i++){
    if(playerArrows[index] !== undefined && boards[i] !== undefined){
      var collision = Matter.SAT.collides(playerArrows[index].body,boards[i].body)

    if(collision.collided){
      boards[i].remove(i);
      playerArrows[index].remove(index);
      }
    } 

  }
}
