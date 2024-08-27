class Algorithms {
    greatestToLeast(a, g) {
        let c = 0
        for (let i = 0; i < a.length; i++) {
            if (a[c] < a[i]) {
                c = i
            }
        }
        g.push(a[c]);
        a.splice(c, 1);
        if (a.length > 0) {
            this.greatestToLeast(a, g);
        }
    }
    leastToGreatest(a, l) {
        let c = 0
        for (let i = 0; i < a.length; i++) {
            if (a[c] > a[i]) {
                c = i
            }
        }
        l.push(a[c]);
        a.splice(c, 1);
        if (a.length > 0) {
            this.leastToGreatest(a, l);
        }
    }
    factorial(x) {
        if (x > 0) {
            return x * this.factorial(x - 1);
        } else {
            return 1;
        }
    }
}
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
class DistributionPrediction extends Statistics {
    constructor(data) {
        super();
        this.dat = data;
    }
    POISSON(n) {
        return Math.pow(this.MEAN(), n)*Math.pow(Math.E, -this.MEAN())/this.factorial(n);
    }
    PredictNextValue() {
        let c = this.dat[0];
        for (let i = this.CI95().min; i < this.CI95().max; i += (this.CI95().max - this.CI95().min)/1000) {
            if (this.POISSON(i) > this.POISSON(c)) {
                c = i;
            }
        }
        return c;
    }
    SIGMOID(x) {
        return 1/(1 + Math.pow(Math.E, -x))
    }
}
class LinearRegression extends Statistics {
    constructor(data) {
        super();
        this.dat = data;
        this.layers = [];
    }
    AvgChange(list) {
        let sum = 0;
        for (let i = 1; i < list.length; i++) {
            sum += (list[i] - list[i-1]);
        }
        sum /= list.length - 1;
        return sum;
    }
    AllChanges() {
        let list = [];
        for (let i = 1; i < this.dat.length; i++) {
            list.push(this.dat[i] - this.dat[i-1]);
        }
        return list;
    }
    DesignAlgorithm() {
        this.layers = [];
        let constancy = this.AvgChange(this.dat);
        this.layers.push(this.dat);
        let currentLayer = [...this.dat];
        while (constancy != 0) {
            this.layers.push(this.AllChanges(currentLayer));
            currentLayer = this.AllChanges(currentLayer);
            constancy = this.AvgChange(currentLayer);
        }
    }
    PredictNextValue() {
        this.DesignAlgorithm();
        let x = 0;
        for (let i = this.layers.length - 1; i > -1; i--) {
            x += this.layers[i][this.layers[i].length - 1];
        }
        return x;
    }
}
