class Main_Cog {
  greatestToLeast(a, g) {
    let c = 0;
    for (let i = 0; i < a.length; i++) {
      if (a[c] < a[i]) {
        c = i;
      }
    }
    g.push(a[c]);
    a.splice(c, 1);
    if (a.length > 0) {
      this.greatestToLeast(a, g);
    }
  }
  leastToGreatest(a, l) {
    let c = 0;
    for (let i = 0; i < a.length; i++) {
      if (a[c] > a[i]) {
        c = i;
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
class Stat_Cog extends Main_Cog {
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
    return Math.sqrt(squareSum / (this.dat.length - 1));
  }
  STERR() {
    return this.STDEV() / Math.sqrt(this.dat.length);
  }
  CI95() {
    return {
      min: this.MEAN() - 2 * this.STERR(),
      max: this.MEAN() + 2 * this.STERR(),
    };
  }
  CI99() {
    return {
      min: this.MEAN() - 3 * this.STERR(),
      max: this.MEAN() + 3 * this.STERR(),
    };
  }
  CI68() {
    return {
      min: this.MEAN() - this.STERR(),
      max: this.MEAN() + this.STERR(),
    };
  }
  MED() {
    let n = this.dat.length;
    if (n % 2 == 1) {
      return this.dat[n / 2 - 0.5];
    } else {
      return (this.dat[n / 2 - 1] + this.dat[n / 2]) / 2;
    }
  }
  RANGE() {
    let temp1 = [...this.dat];
    let gtol = [];
    this.greatestToLeast(temp1, gtol);
    return gtol[0] - gtol[gtol.length - 1];
  }
}
class Dist_Cog extends Stat_Cog {
  constructor(data) {
    super();
    this.dat = data;
  }
  POISSON(n) {
    return (
      (Math.pow(this.MEAN(), n) * Math.pow(Math.E, -this.MEAN())) /
      this.factorial(n)
    );
  }
  SIGMOID(x) {
    return 1 / (1 + Math.pow(Math.E, -x));
  }
  relevants(A, INTERVAL) {
    let dat = [];
    for (let i = 0; i < A.length; i++) {
      if (A[i] >= INTERVAL.min && A[i] <= INTERVAL.max) {
        dat.push(A[i]);
      }
    }
    return dat;
  }
  group(A) {
    let split = Math.floor(A.length * 0.75);
    let train = [...A.slice(0, split)];
    let test = [...A.slice(split, A.length)];
    return { train_group: train, test_group: test };
  }
  #predict(groups) {
    let s = new Stat_Cog(groups.train_group);
    let a = s.MEAN();
    let s2 = new Stat_Cog(groups.test_group);
    let p = s2.MEAN();
    return { predicted_value: a, confidence: 1 - Math.abs((a - p) / a) };
  }
  PredictNextValue() {
    let c = this.dat[0];
    for (
      let i = this.CI95().min;
      i < this.CI95().max;
      i += (this.CI95().max - this.CI95().min) / 1000
    ) {
      if (this.POISSON(i) > this.POISSON(c)) {
        c = i;
      }
    }
    return c;
  }
  predictNextValue() {
    let s = new Stat_Cog(this.dat);
    return this.#predict(this.group(this.relevants(this.dat, s.CI95())));
  }
}
