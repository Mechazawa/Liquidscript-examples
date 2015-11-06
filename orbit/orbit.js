
var canvas,context,Asteroids,Asteroid,tick;
canvas = document.getElementById('orbit');
context = canvas.getContext('2d');
Asteroids = [];
Asteroid = Asteroid || function Asteroid() {
  if(this.initialize) {
    this.initialize.apply(this, arguments);
  }
};
Asteroid.prototype.Size =  null ;
Asteroid.prototype.Velocity = {  "x": 0,   "y": 0};
Asteroid.prototype.Position = {  "x": 0,   "y": 0};
Asteroid.prototype.Mass = 100;
Asteroid.prototype.initialize = function(size,mass,position,velocity) {
  this.Size = size;
  this.Mass = mass;
  this.Position = position;
  this.Velocity = velocity;
};
Asteroid.prototype.draw = function(context) {
  context.beginPath();
  context.arc( this.Position.x + this.Size, this.Position.y + this.Size,this.Size,0, 2 * Math.PI, false );
  context.fillStyle = "#3d3c33";
  context.fill();
};
Asteroid.prototype.tick = function(asteroids) {

  var i,body,distance;
  for(i = 0; i < asteroids.length;i++) {
  body = asteroids[i];
  distance = this.distanceFromBody(body);
  if( distance !== 0) {
     this.Velocity.x +=  ( ( body.Position.x - this.Position.x) * body.Mass) / 1000;
     this.Velocity.y +=  ( ( body.Position.y - this.Position.y) * body.Mass) / 1000;
  };
  };
};
Asteroid.prototype.distanceFromBody = function(body) {

  var distance;
  distance = {    "x": Math.abs( body.Position.x - this.Position.x),     "y": Math.abs( body.Position.y - this.Position.y)};
   return Math.sqrt( distance.x *  distance.x +  distance.y * distance.y);
};
Asteroid.prototype.move = function() {
   this.Position.x +=  this.Velocity.x / 10;
   this.Position.y +=  this.Velocity.y / 10;
};
Asteroid.prototype.toString = function() {
   return "" + (this.Size) + "M " + (this.Position.x) + "," + (this.Position.y) + " @ " + (this.Velocity.x) + ", " + (this.Velocity.y) + "";
};
;
tick = function(asteroids) {

  var i,_a;
  context.clearRect(0,0,canvas.width,canvas.height);
  for(i = 0; i < asteroids.length;i++) {
  asteroids[i].tick(asteroids);
  };
  for(i = 0; i < asteroids.length;i++) {
  asteroids[i].draw(context);
  asteroids[i].move();
  console.log(asteroids[i].toString());
  };
  _a = asteroids;
  setTimeout(function() {
    tick(_a);
  },10);
};
tick([ new Asteroid(50,60,{  "x": 300,   "y": 300},{  "x": 0,   "y": 0}),  new Asteroid(10,1,{  "x": 150,   "y": 150},{  "x": 80,   "y": 0}),  new Asteroid(10,1,{  "x": 450,   "y": 450},{  "x": -160,   "y": 40})]);
