Cogs.js is a JavaScript Library solely for the purpose of data analysis, machine learning, statistics, and algorithms. Built from basic principles of JavaScript and innovative thinking, this library uses ABSOLUTELY ZERO outside libraries (Ti.js is not counted since it was made by me on a separate account, @DarkShadowGithubOfficial, which is no longer my official account). I used my own logical thinking to create this library, and continue to update it regularly to add new features or tweak existing ones. Whenever you need a machine learning library for JavaScript, this is your goto!

DOCUMENTATION

LINK main.js FIRST IN YOUR DOCUMENT HEAD SECTION. OTHERWISE, THERE WILL BE AN ERROR.
THEN LINK ti.js DIRECTLY AFTER.
If linking the scripts doesn't work for some reason, just copy/download the file into your project and link it from there. That always works for me.

Using ti.js:

First, initialize your graph with
```
let scale = your scale // Scale is to make everything easier in case your data ranges between -1 and 1, and then you want to scale it up for better visuals
let g = new Graph();
g.setDimensions(scale*2, scale*2);
g.loadGraph();
```

Make sure to create your regular data, but then separately keep two arrays for x data and y data.

```
let data = [
  your data, each point in the format of {x: your x, y: your y}
];
let xdata = [];
let ydata = [];
data.forEach(point => {
  xdata.push(point.x);
  ydata.push(point.y);
})
```

Then, you can utilize Cogs.js and ti.js to help you with data analysis. For Stat_Cog (basic statistics), Dist_Cog (machine learning for data within a range), and ReCog (linear regression), you need to initialize the Cog with an array of data;

```
let YOUR_STATS = new WHICHEVER_COG(data_array) // Note that data_array must be one-dimensional, so it can't be an array of x and y values. Has to be something like: [0, 1, 1, 2, 0] or [1, 2, 3, 4, 5]
```

To get you started, here's a sample code for your main script that uses random data. I will explain each line to help you get used to what each thing does:

```
let data = []; // Empty array for data points. When you have real data, you can replace this with your data, and each element in this array should be in the format {x: stuff, y: more stuff}
let scale = 250; // For a 500x500 pixel graph
for (let i = 0; i < 1000; i++) { // Adding 1000 random points of data
  let temp = Math.random() * 2 - 1; // Random x value between -1 and 1, since Math.random() only ranges from 0 to 1
  data.push({ x: temp, y: Math.random()*2-1 }); // Adding random data to data array
}

let graph = new Graph(); // Initializing graph
graph.setDimensions(scale*2, scale*2); // 500x500 graph, where (0, 0) is the origin
graph.loadGraph(); // Displays graph
let xdata = []; // Empty one-dimensional array to hold all x values of data points
let ydata = []; // Empty one-dimensional array to hold all y values of data points
data.forEach((point) => { // Iterate through data array
  graph._ctx.fillStyle = "black"; // Black points, just in case it accidentally went to a different color
  graph.createPoint(point.x * scale, point.y * scale); // Scales points up to between -250 and 250, and graphs each point
  xdata.push(point.x); // Adding x data to array
  ydata.push(point.y); // Adding y data to array
});
graph.CIdrawIntervals(xdata, ydata, scale) // Built in function to ti.js which uses Statistics Cog (Stat_Cog) to calculate the 68% Confidence (red), 95% Confidence (green, and also the most useful), and 99% Confidence (Blue) intervals
```
