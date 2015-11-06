#! allow document Math setTimeout setInterval

#Get the canvas we're going to work with
canvas = document.get-element-by-id('orbit)
context = canvas.get-context('2d)

Asteroids = []
class Asteroid {
    Size: null
    Velocity: {x: 0, y: 0}
    Position: {x: 0, y: 0}
    Mass: 100

    initialize: (size, mass, position, velocity) ->{
        this.Size = size
        this.Mass = mass
        this.Position = position
        this.Velocity = velocity
    }

    draw: (context) ->{
        context.begin-path()
        context.arc(
            this.Position.x + this.Size
            this.Position.y + this.Size
            this.Size
            0 
            2 * Math.PI
            false
        )

        context.fill-style = "#3d3c33"
        context.fill()
    }

    tick:(asteroids) ->{
        for(i = 0, i < asteroids.length, i++) {
            body = asteroids[i]
            distance = this.distance-from-body(body)
            if(distance != 0) {
                this.Velocity.x += ((body.Position.x - this.Position.x) * body.Mass) / 1000
                this.Velocity.y += ((body.Position.y - this.Position.y) * body.Mass ) /1000
            }
        }
    }

    distance-from-body: (body)->{
        distance = {
            x: Math.abs(body.Position.x - this.Position.x)
            y: Math.abs(body.Position.y - this.Position.y)
        }

        return Math.sqrt(distance.x * distance.x + distance.y * distance.y)
    }

    move: ->{
        this.Position.x += this.Velocity.x/10
        this.Position.y += this.Velocity.y/10
    }

    to-string: ->
        return "#{this.Size}M #{this.Position.x},#{this.Position.y} @ #{this.Velocity.x}, #{this.Velocity.y}"
}

tick = (asteroids) -> {
    context.clearRect(0, 0, canvas.width, canvas.height)
    for(i=0,i<asteroids.length, i++){
        asteroids[i].tick(asteroids)
    }

    for(i=0,i<asteroids.length, i++){    
        asteroids[i].draw(context)
        asteroids[i].move()
        console.log(asteroids[i].to-string())
    }
    _a = asteroids
    set-timeout(()->{
        tick(_a)
    },10)
}

tick([
    new Asteroid(50, 60, {x: 300, y: 300}, {x:   0, y: 0}) # Main body
    new Asteroid(10, 1, {x: 150, y: 150}, {x:  80, y: 0}) 
    new Asteroid(10, 1, {x: 450, y: 450}, {x: -160, y: 40})
])
