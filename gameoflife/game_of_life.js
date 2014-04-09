
var GameOfLife;
GameOfLife = GameOfLife || function GameOfLife() {
  if(this.initialize) {
    this.initialize.apply(this, arguments);
  }
};
GameOfLife.prototype.currentCellGeneration =  null ;
GameOfLife.prototype.cellSize = 7;
GameOfLife.prototype.numberOfRows = 50;
GameOfLife.prototype.numberOfColumns = 50;
GameOfLife.prototype.seedProbability = 0.4;
GameOfLife.prototype.tickLength = 100;
GameOfLife.prototype.canvas =  null ;
GameOfLife.prototype.drawingContext =  null ;
GameOfLife.prototype.running =  true ;
GameOfLife.prototype.initialize = function() {
  this.createCanvas();
  this.resizeCanvas();
  this.createDrawingContext();
  this.clear();
};
GameOfLife.prototype.start = function() {
  this.running =  true ;
  this.tick();
};
GameOfLife.prototype.stop = function() {
  this.running =  false ;
};
GameOfLife.prototype.createCanvas = function() {
  this.canvas = document.createElement('canvas');
  this.canvas.onClick = function() {
    console.log(1);
  };
  document.body.appendChild(this.canvas);
};
GameOfLife.prototype.resizeCanvas = function() {
  this.canvas.height =  this.cellSize * this.numberOfRows;
  this.canvas.width =  this.cellSize * this.numberOfColumns;
};
GameOfLife.prototype.createDrawingContext = function() {
  this.drawingContext = this.canvas.getContext('2d');
};
GameOfLife.prototype.seed = function() {

  var row,column,seedCell;
  this.currentCellGeneration = [];
  for(row = 0; row < this.numberOfRows;row++) {
  this.currentCellGeneration[row] = [];
  for(column = 0; column < this.numberOfColumns;column++) {
  seedCell = this.createSeedCell(row,column);
  this.currentCellGeneration[row][column] = seedCell;
  };
  };
  this.drawCells();
};
GameOfLife.prototype.clear = function() {

  var row,column,seedCell;
  this.currentCellGeneration = [];
  for(row = 0; row < this.numberOfRows;row++) {
  this.currentCellGeneration[row] = [];
  for(column = 0; column < this.numberOfColumns;column++) {
  seedCell = this.createSeedCell(row,column);
  seedCell.isAlive =  false ;
  this.currentCellGeneration[row][column] = seedCell;
  };
  };
  this.drawCells();
};
GameOfLife.prototype.createSeedCell = function(row,column) {
   return {    "isAlive":  Math.random() < this.seedProbability,     "row": row,     "column": column};
};
GameOfLife.prototype.drawCell = function(cell) {

  var x,y,fillStyle;
  x =  cell.column * this.cellSize;
  y =  cell.row * this.cellSize;
  if(cell.isAlive) {
    fillStyle = "rgb(242, 198, 65)";
  } else {
    fillStyle = "rgb(38, 38, 38)";
  };
  this.drawingContext.strokeStyle = "rgba(242, 198, 65, 0.1)";
  this.drawingContext.strokeRect(x,y,this.cellSize,this.cellSize);
  this.drawingContext.fillStyle = fillStyle;
  this.drawingContext.fillRect(x,y,this.cellSize,this.cellSize);
};
GameOfLife.prototype.drawCells = function() {

  var row,column;
  for(row = 0; row < this.numberOfRows;row++) {
  for(column = 0; column < this.numberOfColumns;column++) {
  this.drawCell(this.currentCellGeneration[row][column]);
  };
  };
};
GameOfLife.prototype.tick = function() {

  var newCellGeneration,row,column,evolvedCell,_this;
  this.drawCells();
  newCellGeneration = [];
  for(row = 0; row < this.numberOfRows;row++) {
  newCellGeneration[row] = [];
  for(column = 0; column < this.numberOfColumns;column++) {
  evolvedCell = this.evolveCell(this.currentCellGeneration[row][column]);
  newCellGeneration[row][column] = evolvedCell;
  };
  };
  this.currentCellGeneration = newCellGeneration;
  if(this.running) {
    _this = this;
    setTimeout(function() {
      _this.tick();
    },100);
  };
};
GameOfLife.prototype.sleep = function(milliseconds) {

  var start,i;
  start =  new Date().getTime();
  for(i = 0; i < 1e7;i++) {
  if( ( new  Date().getTime() - start) > milliseconds) {
    break;
  };
  };
};
GameOfLife.prototype.evolveCell = function(cell) {

  var evolvedCell,numberOfAliveNeighbors;
  evolvedCell = {    "row": cell.row,     "column": cell.column,     "isAlive": cell.isAlive};
  numberOfAliveNeighbors = this.countAliveNeighbors(cell);
  evolvedCell.isAlive =  false ;
  if( cell.isAlive &&  numberOfAliveNeighbors === 2) {
    evolvedCell.isAlive =  true ;
  };
  if( cell.isAlive &&  numberOfAliveNeighbors === 3) {
    evolvedCell.isAlive =  true ;
  };
  if( cell.isAlive ===   false  &&  numberOfAliveNeighbors === 3) {
    evolvedCell.isAlive =  true ;
  };
   return evolvedCell;
};
GameOfLife.prototype.countAliveNeighbors = function(cell) {

  var lowerRowBound,upperRowBound,lowerColumnBound,upperColumnBound,numberOfAliveNeighbors,row,column;
  lowerRowBound = Math.max( cell.row - 1,0);
  upperRowBound = Math.min( cell.row + 1, this.numberOfRows - 1);
  lowerColumnBound = Math.max( cell.column - 1,0);
  upperColumnBound = Math.min( cell.column + 1, this.numberOfColumns - 1);
  numberOfAliveNeighbors = 0;
  for(row = lowerRowBound; row <= upperRowBound;row++) {
  for(column = lowerColumnBound; column <= upperColumnBound;column++) {
  if( row ===  cell.row &&  column === cell.column) {
    continue;
  };
  if(this.currentCellGeneration[row][column].isAlive) {
    numberOfAliveNeighbors++;
  };
  };
  };
   return numberOfAliveNeighbors;
};
;
window.GameOfLife = GameOfLife;
