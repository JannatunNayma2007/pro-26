class Board {
    constructor(x, y, width, height, boardPos) {
    
      this.body = Bodies.rectangle(x, y, width, height);
      this.width = width;
      this.height = height;
  
      this.image = loadImage("./assets/board.png");
      this.boardPosition = boardPos;
      World.add(world, this.body);
    }
  
    display() {
      var angle = this.body.angle;
      var pos = this.body.position;
  
      push();
      translate(pos.x, pos.y);
      rotate(angle);
      imageMode(CENTER);
      image(this.image, 0, this.boardPosition, this.width, this.height);
      pop();
  
    }
   
    remove(index){ 
    
      setTimeout(() => {

      Matter.World.remove(world,boards[index].body); 
      delete boards[index];
      }, 1000); 
  
    }
  }
  
