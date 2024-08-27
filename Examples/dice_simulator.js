function rollDie() {
    rolls[Math.round(Math.random() * 5)]++;
}
let rolls = [0, 0, 0, 0, 0, 0];
let barGraph = new BarGraph(500, 500, "Dice Simulation");
barGraph.loadGraph();
function animate() {
    barGraph._ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    barGraph._ctx.fillRect(0, 0, innerWidth, innerHeight);
    barGraph._ctx.strokeStyle = 'black';
    barGraph._ctx.strokeRect(0, 0, 500, 500);
    rollDie();
    barGraph.SetBars([
        {title: "1", value: rolls[0]},
        {title: "2", value: rolls[1]},
        {title: "3", value: rolls[2]},
        {title: "4", value: rolls[3]},
        {title: "5", value: rolls[4]},
        {title: "6", value: rolls[5]}
    ])
    barGraph.GraphBars();
    requestAnimationFrame(animate);
}
animate();
