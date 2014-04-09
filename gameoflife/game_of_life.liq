#! allow Math document window setTimeout Date

class Game-of-life {
    current-cell-generation: null
    cell-size: 7
    number-of-rows: 50
    number-of-columns: 50
    seed-probability: 0.4
    tick-length: 100
    canvas: null
    drawing-context: null
    running: false

    initialize: -> {
        this.create-canvas()
        this.resize-canvas()
        this.create-drawing-context()
        this.clear()
    }

    start: -> {
        if(this.running) {
            return null
        }
        this.running = true
        this.tick()
    }

    stop: ->
        this.running = false

    create-canvas: -> {
        this.canvas = document.create-element('canvas)
        document.body.append-child(this.canvas)
    }

    resize-canvas: -> {
        this.canvas.height = this.cell-size * this.number-of-rows
        this.canvas.width  = this.cell-size * this.number-of-columns
    }

    create-drawing-context: ->
        this.drawing-context = this.canvas.get-context('2d)

    seed: -> {
        this.current-cell-generation = []
        for(row = 0, row < this.number-of-rows, row++) {
            this.current-cell-generation[row] = []
            for(column = 0, column < this.number-of-columns, column++) {
                seed-cell = this.create-seed-cell(row, column)
                this.current-cell-generation[row][column] = seed-cell
            }
        }
        this.draw-cells()
    }

    clear: -> {
        this.current-cell-generation = []
        for(row = 0, row < this.number-of-rows, row++) {
            this.current-cell-generation[row] = []
            for(column = 0, column < this.number-of-columns, column++) {
                seed-cell = this.create-seed-cell(row, column)
                seed-cell.is-alive = false
                this.current-cell-generation[row][column] = seed-cell
            }
        }
        this.draw-cells()
    }

    create-seed-cell: (row, column) -> {
        return {
            is-alive: Math.random() < this.seed-probability
            row: row
            column: column
        }
    }

    draw-cell: (cell) -> {
        x = cell.column * this.cell-size
        y = cell.row * this.cell-size

        if (cell.is-alive) {
            fill-style = "rgb(242, 198, 65)"
        } else {
            fill-style = "rgb(38, 38, 38)"
        }

        this.drawing-context.stroke-style = "rgba(242, 198, 65, 0.1)"
        this.drawing-context.stroke-rect(x, y, this.cell-size, this.cell-size)

        this.drawing-context.fill-style = fill-style
        this.drawing-context.fill-rect(x ,y, this.cell-size, this.cell-size)
    }

    draw-cells: -> {
        for(row = 0, row < this.number-of-rows, row++) {
            for(column = 0, column < this.number-of-columns, column++){
                this.draw-cell(this.current-cell-generation[row][column])
            }
        }
    }

    tick: -> {
        this.draw-cells()
        new-cell-generation = []

        for(row = 0, row < this.number-of-rows, row++) {
            new-cell-generation[row] = []
            for(column = 0, column < this.number-of-columns, column++) {
                evolved-cell = this.evolve-cell(this.current-cell-generation[row][column])
                new-cell-generation[row][column] = evolved-cell
            }
        }
        this.current-cell-generation = new-cell-generation

        #This is a bug with javascript that can be fixed in this crazy way
        #Ye I know it's silly but whatever
        if(this.running) {
            _this = this
            set-timeout(()->{_this.tick()}, 100)
        }
    }

    sleep: (milliseconds) -> {
      start = new Date().getTime()
      for (i = 0, i < 1e7, i++) {
        if ((new Date().getTime() - start) > milliseconds){
          break
        }
      }
    }

    evolve-cell: (cell) -> {
        evolved-cell = {
            row: cell.row
            column: cell.column
            is-alive: cell.is-alive
        }

        number-of-alive-neighbors = this.count-alive-neighbors(cell)

        #elseif was not implemented upon writing this
        evolved-cell.is-alive = false
        if(cell.is-alive and number-of-alive-neighbors == 2){
            evolved-cell.is-alive = true
        } 
        if(cell.is-alive and number-of-alive-neighbors == 3){
            evolved-cell.is-alive = true
        } 
        if(cell.is-alive == false and number-of-alive-neighbors == 3){
            evolved-cell.is-alive = true
        } 

        return evolved-cell
    }

    count-alive-neighbors: (cell) -> {
        lower-row-bound = Math.max(cell.row - 1, 0)
        upper-row-bound = Math.min(cell.row + 1, this.number-of-rows - 1)
        lower-column-bound = Math.max(cell.column - 1, 0)
        upper-column-bound = Math.min(cell.column + 1, this.number-of-columns - 1)
        number-of-alive-neighbors = 0

        for(row = lower-row-bound, row <= upper-row-bound, row++){
            for(column = lower-column-bound, column <= upper-column-bound, column++) {
                if(row == cell.row and column == cell.column) {
                    continue
                }
                if(this.current-cell-generation[row][column].is-alive) {
                    number-of-alive-neighbors++
                }
            }
        }
        return number-of-alive-neighbors
    }
}

window.Game-of-life = Game-of-life