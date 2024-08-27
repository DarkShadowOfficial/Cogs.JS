function addScript(src) {
  let script = document.createElement('script');
  script.src = src;
  document.head.appendChild(script);
}
addScript("https://raw.githubusercontent.com/DarkShadowOfficial/Cogs.JS/main/Scripts/Algorithms.js");
addScript("https://raw.githubusercontent.com/DarkShadowOfficial/Cogs.JS/main/Scripts/Statistics.js");
addScript("https://raw.githubusercontent.com/DarkShadowOfficial/Cogs.JS/main/Scripts/Distribution.js");
addScript("https://raw.githubusercontent.com/DarkShadowOfficial/Cogs.JS/main/Scripts/Regression.js");
