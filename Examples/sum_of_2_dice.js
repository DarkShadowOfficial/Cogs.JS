function rollDies() {
    let sum = Math.round(Math.random() * 5 + 1) + Math.round(Math.random() * 5 + 1);
    rollSums[sum - 2]++;
}
let rollSums = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let barGraph = new BarGraph(500, 500, "Sum of 2 Dice Simulation with Normal Distribution Curve");
barGraph.loadGraph();
function animate() {
    barGraph._ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    barGraph._ctx.fillRect(0, 0, innerWidth, innerHeight);
    barGraph._ctx.strokeStyle = 'black';
    barGraph._ctx.strokeRect(0, 0, 500, 500);
    rollDies();
    barGraph.SetBars([
        {title: "2", value: rollSums[0]},
        {title: "3", value: rollSums[1]},
        {title: "4", value: rollSums[2]},
        {title: "5", value: rollSums[3]},
        {title: "6", value: rollSums[4]},
        {title: "7", value: rollSums[5]},
        {title: "8", value: rollSums[6]},
        {title: "9", value: rollSums[7]},
        {title: "10", value: rollSums[8]},
        {title: "11", value: rollSums[9]},
        {title: "12", value: rollSums[10]}
    ])
    barGraph.GraphBars();
    for (let i = 0; i < 11; i++) {
        if (i < 10) {
            let x = 2*barGraph.barWidth*i + barGraph.barWidth/2;
            let x1 = 2*barGraph.barWidth*(i+1) + barGraph.barWidth/2;
            barGraph.line(x + barGraph.barWidth/2, barGraph.height - rollSums[i]*barGraph.barScale, x1 + barGraph.barWidth/2, barGraph.height - rollSums[i+1]*barGraph.barScale);
        }
    }
    requestAnimationFrame(animate);
}
animate();
