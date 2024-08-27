function addScript(src) {
  let script = document.createElement('script');
  script.src = src;
  document.head.appendChild(script);
}
addScript("https://github.com/DarkShadowOfficial/Cogs.JS/raw/main/Scripts/Algorithms.js");
addScript("https://github.com/DarkShadowOfficial/Cogs.JS/raw/main/Scripts/Statistics.js");
addScript("https://github.com/DarkShadowOfficial/Cogs.JS/raw/main/Scripts/Distribution.js");
addScript("https://github.com/DarkShadowOfficial/Cogs.JS/raw/main/Scripts/Regression.js");
