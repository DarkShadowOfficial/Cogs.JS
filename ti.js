/* CREATED ON A SEPARATE GITHUB ACCOUNT - DarkShadowGithubOfficial (Old account)
Get answer from string equation with eval function. Example:
eval("1+2*4/5");

This would return 2.6
*/
function eval(str) {
  return new Function(`return ${str}`)();
}
/* 
  Get exponents by using log function. Example:
  log(2, 8);
  
  This would return 3 because 2 to the power of 3 is 8.
  */
function log(base, result) {
  return Math.log(result) / Math.log(base);
}
/* 
  Get angle in degrees through the sine with arcsin function. Example:
  arcsin(0.5);
  
  This would return 30 because the sine of a 30 degree angle is 0.5
  Please note that Math.asin and arcsin are similar to each other, except that asin returns the angle in radians. arcsin returns the angle in degrees.
  */
function arcsin(sine) {
  let r = Math.asin(sine);
  let deg = (r / Math.PI) * 180;
  return deg;
}
/*
  Graph and its functions:
  let g = new Graph();
  g.setDimensions(width of graph, height of graph);
  g.loadGraph();
  g.createPoint(x, y);
  g.createPoint(x1, y1);
  g.line(x, y, x1, y1);
  // g.line connects the first point and the second with a line.
  
  */
// Please note that createPoint() and line() work under the assumption that x and y are relative to the origin aka the center of the screen and intersection of the axis.
class Graph {
  constructor() {
    this._canvas = document.createElement("canvas");
    this._ctx = this._canvas.getContext("2d");
    this._ctx.fillStyle = "black";
    this._ctx.strokeStyle = "black";
  }
  setDimensions(w, h) {
    this._canvas.width = w;
    this._canvas.height = h;
  }
  loadGraph() {
    document.body.appendChild(this._canvas);
    this._ctx.beginPath();
    this._ctx.moveTo(this._canvas.width / 2, 0);
    this._ctx.lineTo(this._canvas.width / 2, this._canvas.height);
    this._ctx.stroke();
    this._ctx.closePath();
    this._ctx.beginPath();
    this._ctx.moveTo(0, this._canvas.height / 2);
    this._ctx.lineTo(this._canvas.width, this._canvas.height / 2);
    this._ctx.stroke();
    this._ctx.closePath();
  }
  createPoint(x, y) {
    let x1 = this._canvas.width / 2 + x;
    let y1 = this._canvas.height / 2 - y;
    this._ctx.beginPath();
    this._ctx.arc(x1, y1, 2.5, 0, Math.PI * 2);
    this._ctx.fill();
    this._ctx.closePath();
  }
  line(x0, y0, x1, y1) {
    this._ctx.beginPath();
    this._ctx.moveTo(x0 + this._canvas.width / 2, this._canvas.height / 2 - y0);
    this._ctx.lineTo(x1 + this._canvas.width / 2, this._canvas.height / 2 - y1);
    this._ctx.stroke();
    this._ctx.closePath();
  }
  // Cogs.js related functions
  CIdrawIntervals(xdata /*Array*/, ydata /*Array*/, scale) {
    let xstats = new Stat_Cog(xdata);
    let ystats = new Stat_Cog(ydata);
    graph._ctx.strokeStyle = "green";
    // 95% Confidence Interval: Green
    graph._ctx.strokeRect(
      xstats.CI95().min * scale + scale,
      ystats.CI95().min * scale + scale,
      xstats.CI95().max * scale - xstats.CI95().min * scale,
      ystats.CI95().max * scale - ystats.CI95().min * scale
    );
    // 68% Confidence Interval: Red
    graph._ctx.strokeStyle = "red";
    graph._ctx.strokeRect(
      xstats.CI68().min * scale + scale,
      ystats.CI68().min * scale + scale,
      xstats.CI68().max * scale - xstats.CI68().min * scale,
      ystats.CI68().max * scale - ystats.CI68().min * scale
    );
    // 99% Confidence Interval: Blue
    graph._ctx.strokeStyle = "blue";
    graph._ctx.strokeRect(
      xstats.CI99().min * scale + scale,
      ystats.CI99().min * scale + scale,
      xstats.CI99().max * scale - xstats.CI99().min * scale,
      ystats.CI99().max * scale - ystats.CI99().min * scale
    );
  }
}
