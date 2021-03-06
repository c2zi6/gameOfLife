class GrassEater extends Main {
    constructor(x, y) {
        super(x, y);
        this.energy = 10;
    }
    chooseCell(char) {
        this.getNewCoordinates();
        return super.chooseCell(char);
    }
    mul() {
        let found = this.chooseCell(0);
        let exact = random(found);
        if (exact) {
            let x = exact[0];
            let y = exact[1];
            let eater = new GrassEater(x, y);
            matrix[y][x] = 2;
            grassEaterArr.push(eater);
            this.energy = 20;
        }
    }
    eat() {
        if (Math.random() * 500 < 1) {
            for (var i in grassEaterArr) {
                if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                }
            }
            matrix[this.y][this.x] = 6;
            virusArr.push(new Virus(this.x, this.y))
        } else {
            let found = this.chooseCell(1);
            let exact = random(found);
            if (exact) {
                this.energy += 3;
                let x = exact[0];
                let y = exact[1];
                for (var i in grassAr) {
                    if (x == grassAr[i].x && y == grassAr[i].y) {
                        grassAr.splice(i, 1);
                    }
                }
                matrix[y][x] = 2;
                matrix[this.y][this.x] = 0;
                this.x = x;
                this.y = y;

                if (this.energy > 30) {
                    this.mul();
                }
            } else {
                this.move();
            }
        }
    }
    move() {
        let found = this.chooseCell(0);
        let exact = random(found);
        if (exact) {
            let x = exact[0];
            let y = exact[1];
            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            this.energy--;
            if (this.energy < 0) {
                this.die();
            }
        } else {
            this.energy--;
            if (this.energy < 0) {
                this.die();
            }
        }
    }
    die() {
        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
            }
        }
        matrix[this.y][this.x] = 4;
    }
}