#! allow Math
rgb = (color) -> {
    c=color.join(",")
    return "rgb(#{c})"
}
plot = (canvas, x, y, color) -> {
    # Get context
    ctx = canvas.get-context('2d')
    # Set color
    ctx.fill-style = rgb(color)
    # Plot rectangle from x, y with width, height = 1, 1
    ctx.fill-rect(x, y, 0.9, 0.9)
}
class Complex {
    initialize: (x, y) -> {
        this.x = x
        this.y = y
    }
    magnitude: ->
        return Math.sqrt(this.x*this.x+this.y*this.y)
    negative: ->
        return new Complex(-this.x, -this.y)
    to-atring: ->
        return "{#{this.x},#{this.y}}"
    value-of: ->
        return this.x
    add: (complex) ->
        return new Complex(this.x + complex.x, this.y + complex.y)
    subtract: (complex) ->
        return new Complex(this.x - complex.x, this.y - complex.y)
    multiply: (complex) ->
        return new Complex(
            this.x * complex.x - this.y * complex.y,
            this.x * complex.y + this.y * complex.x
        )
    
}
mandelbrot = (canvas, max-iterations) -> {
    # Range of the x and y cords on the complex plane
    xcoords = []
    ycoords = []
    for (xp = 0, xp < canvas.width, xp++) { xcoords.push(xp / 
canvas.width * 3 - 2.25) }
    for (yp = 0, yp < canvas.height, yp++) { ycoords.push(yp / 
canvas.height * 2 - 1) }

    for(x = 0, x < canvas.width, x++) {
        for(y = 0, y < canvas.height, y++) {
            z = new Complex(0,0)
            c = new Complex(xcoords[x], ycoords[y])
            color = [0,0,0]
            for(i = 0, i < max-iterations, i++) {
                z = z.multiply(z).add(c)
                if(z.magnitude() >= 2.236) {
                    color = [
                        (i * 3 + 255) % 255,
                        (i * 2 + 255) % 255,
                        (i * 1 + 255) % 255
                    ]
                    break
                }
            }
            plot(canvas, x, y, color)
        }
    }
}
