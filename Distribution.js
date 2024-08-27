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
