class Predator extends Main {
    constructor(x, y) {
        super(x, y);
        this.energy = 10;
    }
    eat() {
        if (Math.random() * 500 < 1) {
            for (var i in predatorArr) {
                if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                }
            }
            matrix[this.y][this.x] = 6;
            virusArr.push(new Virus(this.x, this.y))
        } else {
            this.getNewCoordinates();
            let found = this.chooseCell(1);
            let found2 = this.chooseCell(2);
            for (var i in found2) {
                found.push(found2[i])
            }
            let exact = random(found);
            if (exact) {
                let x = exact[0];
                let y = exact[1];
                for (var i in grassAr) {
                    if (x == grassAr[i].x && y == grassAr[i].y) {
                        grassAr.splice(i, 1);
                        this.energy += 2
                    }
                }
                for (var i in grassEaterArr) {
                    if (x == grassEaterArr[i].x && y == grassEaterArr[i].y) {
                        grassEaterArr.splice(i, 1);
                        this.energy += 10
                    }
                }

                matrix[y][x] = 3;
                matrix[this.y][this.x] = 0;
                this.y = y;
                this.x = x;
                if (this.energy > 25) {
                    this.mul();
                }
            } else {
                this.move();
            }
        }
    }
    mul() {
        var found = this.chooseCell(0);
        var rand = random(found);
        if (rand) {
            var y = rand[1];
            var x = rand[0];
            matrix[y][x] = 3;
            predatorArr.push(new Predator(x, y));
            this.energy = 10;
        }
    }
    move() {
        this.energy--;
        let found = this.chooseCell(0);
        let exact = random(found);
        if (exact) {
            let x = exact[0];
            let y = exact[1];
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            if (this.energy < 0) {
                this.die();
            }
        }
    }
    die() {
        for (var i in predatorArr) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                predatorArr.splice(i, 1);
            }
        }
        matrix[this.y][this.x] = 4;
    }
}