function coinFlip() {
    flips[Math.round(Math.random())]++;
}
let flips = [0, 0];
let barGraph = new BarGraph(500, 500, "Coin Flip Simulation");
barGraph.loadGraph();
function animate() {
    barGraph._ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    barGraph._ctx.fillRect(0, 0, innerWidth, innerHeight);
    barGraph._ctx.strokeStyle = 'black';
    barGraph._ctx.strokeRect(0, 0, 500, 500);
    coinFlip();
    barGraph.SetBars([
        {title: "Heads", value: flips[0]},
        {title: "Tails", value: flips[1]}
    ])
    barGraph.GraphBars();
    requestAnimationFrame(animate);
}
animate();
