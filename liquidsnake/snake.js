
var Heading,Snake;
Heading = Heading || {};
Heading.Right = {  "x": 1,   "y": 0};
Heading.Left = {  "x": -1,   "y": 0};
Heading.Up = {  "x": 0,   "y": -1};
Heading.Down = {  "x": 0,   "y": 1};
;
Snake = Snake || function Snake() {
  if(this.initialize) {
    this.initialize.apply(this, arguments);
  }
};
Snake.prototype.tail = [];
Snake.prototype.pallets = [];
Snake.prototype.direction = Heading.Right;
Snake.prototype.canvas =  null ;
Snake.prototype.context =  null ;
Snake.prototype.cellSize = 12;
Snake.prototype.numberOfRows = 0;
Snake.prototype.numberOfColumns = 0;
Snake.prototype.score = 0;
Snake.prototype.dead =  false ;
Snake.prototype.initialize = function(rows,columns) {
  this.numberOfRows = rows;
  this.numberOfColumns = columns;
  this.canvas = document.createElement('canvas');
  document.body.appendChild(this.canvas);
  this.canvas.height =  this.cellSize *  this.numberOfRows + 30;
  this.canvas.width =  this.cellSize * this.numberOfColumns;
  this.context = this.canvas.getContext('2d');
  this.tail = [{    "x": Math.ceil( this.numberOfColumns / 2),     "y": Math.ceil( this.numberOfRows / 2)}, {    "x":  Math.ceil( this.numberOfColumns / 2) - 1,     "y": Math.ceil( this.numberOfRows / 2)}, {    "x":  Math.ceil( this.numberOfColumns / 2) - 2,     "y": Math.ceil( this.numberOfRows / 2)}];
  this.createPallet();
  this.draw();
};
Snake.prototype.tick = function() {
  if( ! this.dead) {
    this.changeDirection();
    this.move();
    this.draw();
  };
};
Snake.prototype.changeDirection = function() {
  if( CurrentKey ===  38 &&  this.direction !== Heading.Down) {
    this.direction = Heading.Up;
  }else if( CurrentKey ===  40 &&  this.direction !== Heading.Up) {
    this.direction = Heading.Down;
  }else if( CurrentKey ===  37 &&  this.direction !== Heading.Right) {
    this.direction = Heading.Left;
  }else if( CurrentKey ===  39 &&  this.direction !== Heading.Left) {
    this.direction = Heading.Right;
  };
   return this.direction;
};
Snake.prototype.draw = function() {
  this.canvas.width = this.canvas.width;
  this.drawCells();
  this.drawTail();
  this.drawPallets();
  this.drawScore();
};
Snake.prototype.drawScore = function() {
  this.context.font = "bold 20px sans-serif";
  this.context.fillStyle = "rgb(242, 198, 65)";
  this.context.fillText("" + (this.score) + "",10, this.cellSize *  this.numberOfColumns + 23);
};
Snake.prototype.drawCells = function() {

  var x,y;
  for(x = 0; x < this.numberOfColumns;x++) {
  for(y = 0; y < this.numberOfRows;y++) {
  this.context.strokeStyle = "rgba(242, 198, 65, 0.1)";
  this.context.strokeRect( x * this.cellSize, y * this.cellSize,this.cellSize,this.cellSize);
  };
  };
};
Snake.prototype.drawTail = function() {

  var i,segment;
  for(i = 0; i < this.tail.length;i++) {
  segment = this.tail[i];
  if( i ===  0 && this.dead) {
    this.context.fillStyle = "#bf1a14";
  } else {
    this.context.fillStyle = "rgb(242, 198, 65)";
  };
  this.context.fillRect( segment.x * this.cellSize, segment.y * this.cellSize,this.cellSize,this.cellSize);
  };
};
Snake.prototype.drawPallets = function() {

  var i,pallet;
  for(i = 0; i < this.pallets.length;i++) {
  pallet = this.pallets[i];
  this.context.fillStyle = "rgb(202, 160, 65)";
  this.context.fillRect( pallet.x * this.cellSize, pallet.y * this.cellSize,this.cellSize,this.cellSize);
  };
};
Snake.prototype.createPallet = function() {

  var pallet,i;
  pallet = {    "x": 0,     "y": 0};
  for(i = 0; i <  10 * ( this.numberOfRows * this.numberOfColumns);i++) {
  pallet = {    "x": Math.floor( Math.random() * this.numberOfColumns),     "y": Math.floor( Math.random() * this.numberOfRows)};
  for(i = 0; i < this.pallets.length;i++) {
  if(this.compareVector(pallet,this.pallets[i])) {
    continue;
  };
  };
  for(i = 0; i < this.tail.length;i++) {
  if(this.compareVector(pallet,this.tail[i])) {
    continue;
  };
  };
  break;
  };
  this.pallets.push(pallet);
};
Snake.prototype.move = function() {

  var segment,i;
  segment = {    "x": this.tail[0].x,     "y": this.tail[0].y};
  this.tail.pop();
   segment.x += this.direction.x;
   segment.y += this.direction.y;
  segment.x =  ( this.numberOfColumns + segment.x) % this.numberOfColumns;
  segment.y =  ( this.numberOfRows + segment.y) % this.numberOfRows;
  for(i = 0; i < this.pallets.length;i++) {
  if(this.compareVector(this.pallets[i],segment)) {
    this.pallets.splice(i,1);
    this.createPallet();
    this.tail.push({      "x": this.tail[ this.tail.length - 1].x,       "y": this.tail[ this.tail.length - 1].y});
    console.log("Nom nom");
    this.score++;
    break;
  };
  };
  for(i = 1; i < this.tail.length;i++) {
  if(this.compareVector(segment,this.tail[i])) {
    this.dead =  true ;
    console.log("RIP");
    break;
  };
  };
  if( ! this.dead) {
    this.tail.unshift(segment);
  };
};
Snake.prototype.compareVector = function(v1,v2) {
   return  v1.x ===  v2.x &&  v1.y === v2.y;
};
;
