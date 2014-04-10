#! allow Math document
#! allow CurrentKey

module Heading {
    Right: {x: 1, y: 0}
    Left: {x: -1, y: 0}
    Up: {x: 0, y: -1}
    Down: {x: 0, y: 1}
}

class Snake {
    tail: []
    pallets: []
    direction: Heading.Right
    canvas: null
    context: null
    cell-size: 12
    number-of-rows: 0
    number-of-columns: 0
    score: 0
    dead: false

    initialize:(rows, columns) -> {
        this.number-of-rows = rows
        this.number-of-columns = columns

        this.canvas = document.create-element('canvas)
        document.body.append-child(this.canvas)
        this.canvas.height = this.cell-size * this.number-of-rows + 30
        this.canvas.width  = this.cell-size * this.number-of-columns
        this.context = this.canvas.get-context('2d)

        this.tail = [{
            x: Math.ceil(this.number-of-columns/2)
            y: Math.ceil(this.number-of-rows/2)
        },{
            x: Math.ceil(this.number-of-columns/2) - 1
            y: Math.ceil(this.number-of-rows/2)
        },{
            x: Math.ceil(this.number-of-columns/2) - 2
            y: Math.ceil(this.number-of-rows/2)
        }]

        this.create-pallet()
        this.draw()
    }

    tick: ->{
        if(!this.dead) {
            this.change-direction()
            this.move()
            this.draw()
        } 
    }

    change-direction: ->{
        if(CurrentKey == 38 and this.direction != Heading.Down) {
            this.direction = Heading.Up
        } elsif (CurrentKey == 40 and this.direction != Heading.Up) {
            this.direction = Heading.Down
        } elsif (CurrentKey == 37 and this.direction != Heading.Right) {
            this.direction = Heading.Left
        } elsif (CurrentKey == 39 and this.direction != Heading.Left) {
            this.direction = Heading.Right
        }

        return this.direction
    }

    draw: ->{
        this.canvas.width = this.canvas.width
        this.draw-cells()
        this.draw-tail()
        this.draw-pallets()
        this.draw-score()
    }

    draw-score: ->{
        this.context.font = "bold 20px sans-serif"
        this.context.fill-style = "rgb(242, 198, 65)"
        this.context.fillText("#{this.score}", 10, this.cell-size * this.number-of-columns + 23)
    }

    draw-cells: ->{
        for(x = 0, x < this.number-of-columns, x++) {
            for(y = 0, y < this.number-of-rows, y++) {
                this.context.stroke-style = "rgba(242, 198, 65, 0.1)"
                this.context.stroke-rect(
                    x * this.cell-size
                    y * this.cell-size
                    this.cell-size
                    this.cell-size
                )
            }
        }
    }

    draw-tail: ->{
        for(i = 0, i < this.tail.length, i++) {
            segment = this.tail[i]

            # If we died highlight where we died
            if(i == 0 and this.dead) {
                this.context.fill-style = "#bf1a14"
            } else {
                this.context.fill-style = "rgb(242, 198, 65)"
            }
            this.context.fill-rect(
                segment.x * this.cell-size
                segment.y * this.cell-size
                this.cell-size
                this.cell-size
            )
        }
    }

    draw-pallets: ->{
        for(i = 0, i < this.pallets.length, i++) {
            pallet = this.pallets[i]

            this.context.fill-style = "rgb(202, 160, 65)"
            this.context.fill-rect(
                pallet.x * this.cell-size
                pallet.y * this.cell-size
                this.cell-size
                this.cell-size
            )
        }
    }

    create-pallet: -> {
        pallet = {x: 0, y: 0}

        #don't get stuck in an infinite loop
        for(i = 0, i < 10 * (this.number-of-rows * this.number-of-columns), i++){
            pallet = {
                x: Math.floor(Math.random() * this.number-of-columns)
                y: Math.floor(Math.random() * this.number-of-rows)
            }

            # Check if a pallet already exists at this
            #  location
            for(i = 0, i < this.pallets.length, i++) {
                if(this.compare-vector(pallet, this.pallets[i])) {
                    continue
                }
            }

            # We don't want a pallet to spawn on an 
            #  already existing tail segment
            for(i = 0, i < this.tail.length, i++) {
                if(this.compare-vector(pallet, this.tail[i])) {
                    continue
                }
            }

            break # We found a pallet location!
        }

        this.pallets.push(pallet)
    }

    move: ->{
        segment = {
            x: this.tail[0].x
            y: this.tail[0].y
        }
        this.tail.pop() # Maybe the tail only has one element so 
                        #  we pop it AFTER we stored the front segment
        segment.x += this.direction.x
        segment.y += this.direction.y

        # Make sure that when we hit a wall we exit on the 
        #  other side of the screen
        segment.x = (this.number-of-columns + segment.x) % this.number-of-columns
        segment.y = (this.number-of-rows + segment.y) % this.number-of-rows

        # Did we just eat a pallet?
        for(i = 0, i < this.pallets.length, i++) {
            if(this.compare-vector(this.pallets[i], segment)) {
                this.pallets.splice(i, 1)
                this.create-pallet() # Create a new pallet that we can eat

                # Create a new segment for the tail
                this.tail.push({
                    x: this.tail[this.tail.length - 1].x
                    y: this.tail[this.tail.length - 1].y
                })
                console.log("Nom nom")
                this.score++
                break # There can only be one pallet per segment
                      #  so we don't need to check the rest of 
                      #  the pallets
            }
        }

        # Did we just colide with ourself?
        for(i = 1, i < this.tail.length, i++) {
            if(this.compare-vector(segment, this.tail[i])) {
                this.dead = true # Oh noes we died!
                console.log("RIP")
                break # We already know we're dead so why should we 
                      #  check the rest of the segments
            }
        }

        # Don't add the new front segment because we died
        if(!this.dead) {
            this.tail.unshift(segment)
        }
    }

    compare-vector: (v1, v2) ->{
        return v1.x == v2.x and v1.y == v2.y
    }
}