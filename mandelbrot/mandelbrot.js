
var rgb,plot,Complex,mandelbrot;
rgb = function(color) {

  var c;
  c = color.join(",");
   return "rgb(" + (c) + ")";
};
plot = function(canvas,x,y,color) {

  var ctx;
  ctx = canvas.getContext('2d');
  ctx.fillStyle = rgb(color);
  ctx.fillRect(x,y,0.9,0.9);
};
Complex = Complex || function Complex() { if(this.initialize) { this.initialize.apply(this, arguments); } };
Complex.prototype.initialize      = function(x,y) {
  this.x = x;
  this.y = y;
};
Complex.prototype.magnitude      = function() {
   return Math.sqrt( this.x *  this.x +  this.y * this.y);
};
Complex.prototype.negative      = function() {
   return  new Complex(-this.x,-this.y);
};
Complex.prototype.toAtring      = function() {
   return "{" + (this.x) + "," + (this.y) + "}";
};
Complex.prototype.valueOf      = function() {
   return this.x;
};
Complex.prototype.add      = function(complex) {
   return  new Complex( this.x + complex.x, this.y + complex.y);
};
Complex.prototype.subtract      = function(complex) {
   return  new Complex( this.x - complex.x, this.y - complex.y);
};
Complex.prototype.multiply      = function(complex) {
   return  new Complex( this.x *  complex.x -  this.y * complex.y, this.x *  complex.y +  this.y * complex.x);
};
;
mandelbrot = function(canvas,maxIterations) {

  var xcoords,ycoords,xp,yp,x,y,z,c,color,i;
  xcoords = [];
  ycoords = [];
  for(xp = 0; xp < canvas.width;xp++) {
  xcoords.push( xp /  canvas.width *  3 - 2.25);
  };
  for(yp = 0; yp < canvas.height;yp++) {
  ycoords.push( yp /  canvas.height *  2 - 1);
  };
  for(x = 0; x < canvas.width;x++) {
  for(y = 0; y < canvas.height;y++) {
  z =  new Complex(0,0);
  c =  new Complex(xcoords[x],ycoords[y]);
  color = [0, 0, 0];
  for(i = 0; i < maxIterations;i++) {
  z = z.multiply(z).add(c);
  if( z.magnitude() >= 2.236) {
    color = [ ( i *  3 + 255) % 255,  ( i *  2 + 255) % 255,  ( i *  1 + 255) % 255];
    break;
  };
  };
  plot(canvas,x,y,color);
  };
  };
};
