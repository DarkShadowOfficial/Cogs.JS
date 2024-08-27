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
}
