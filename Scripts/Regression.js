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
