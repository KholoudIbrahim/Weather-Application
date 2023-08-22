
document.getElementById("search").addEventListener("keyup", a=>{
   search(a.target.value)
}
);

search("cairo");


async function search(a) {
   let t = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=b4ebd75328284303bf462938232208&q=${a}&days=3`);
   if (t.ok) {
       let a = await t.json();
       displayToday(a.location, a.current),
       displayAnother(a.forecast.forecastday)
   }
}

var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function displayToday(a, t) {
   if (null != t && t != 400) {
      var e = new Date(t.last_updated.replace(" ", "T"));
      let n = `<div class="today forecast">   
      <div class="forecast-header"  id="today">    
      <div class="day">${days[e.getDay()]}
      </div>  
      <div class=" date">
      ${e.getDate() + monthNames[e.getMonth()]}
      </div>
      </div> \x3c!-- .forecast-header --\x3e   
      <div class="forecast-content" id="current">   
      <div class="location">
      ${a.name}
      </div>  
      <div class="degree">     
      <div class="num">
      ${t.temp_c}
      <sup>
      o
      </sup>
      C
      </div>
      <div class="forecast-icon">\n
      <img src="https:${t.condition.icon}" alt="" width=90>\n
      </div>
      </div>
      <div class="custom">
         ${t.condition.text}
      </div>
      <span>
      <img src="images/icon-umberella.png" alt="">
      20%
      </span>
      <span>
      <img src="images/icon-wind.png" alt="">
      18km/h</span>
      <span>
      <img src="images/icon-compass.png" alt="">East</span>\n
      </div>
      </div>`;
      document.getElementById("forecast").innerHTML = n
   }
   // else{
   //   (&& t != 400)
   //    console.log('ok')
   // }

}
function displayAnother(a) {
   let t = "";
   for (let e = 1; e < a.length; e++)
       t += `\t<div class="forecast">
      <div class="forecast-header">
      <div class="day">
      ${days[new Date(a[e].date.replace(" ", "T")).getDay()]}
      </div>        
      </div>
      \x3c!-- .forecast-header --\x3e
      <div class="forecast-content">
      <div class="forecast-icon">
      <img src="https:${a[e].day.condition.icon}" alt="" width=48>
      </div>
      <div class="degree">
      ${a[e].day.maxtemp_c}
      <sup>
      o
      </sup>
      C
      </div>
      <h6>${a[e].day.mintemp_c}<sup>o</sup></h6>\n            <div class="custom">${a[e].day.condition.text}</div>\n        </div>\n        </div>`;
   document.getElementById("forecast").innerHTML += t
}
