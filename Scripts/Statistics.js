class Statistics extends Algorithms {
    constructor(data) {
        super();
        this.dat = data;
    }
    MEAN() {
        let sum = 0;
        for (let i = 0; i < this.dat.length; i++) {
            sum += this.dat[i];
        }
        return sum / this.dat.length;
    }
    STDEV() {
        let squareSum = 0;
        for (let i = 0; i < this.dat.length; i++) {
            squareSum += Math.pow(this.dat[i] - this.MEAN(), 2);
        }
        return Math.sqrt(squareSum/(this.dat.length - 1));
    }
    STERR() {
        return this.STDEV()/Math.sqrt(this.dat.length);
    }
    CI95() {
        return {
            min: this.MEAN() - 2*this.STERR(),
            max: this.MEAN() + 2*this.STERR()
        }
    }
    CI99() {
        return {
            min: this.MEAN() - 3*this.STERR(),
            max: this.MEAN() + 3*this.STERR()
        }
    }
    CI68() {
        return {
            min: this.MEAN() - this.STERR(),
            max: this.MEAN() + this.STERR()
        }
    }
    MED() {
        let n = this.dat.length;
        if (n%2 == 1) {
            return this.dat[n/2 - 0.5];
        } else {
            return (this.dat[n/2 - 1] + this.dat[n/2])/2;
        }
    }
    RANGE() {
        let temp1 = [...this.dat];
        let gtol = [];
        this.greatestToLeast(temp1, gtol);
        return gtol[0] - gtol[gtol.length - 1];
    }
}
