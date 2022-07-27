// var Key = "055cc3bc9e9a5385d884815e957c50f0";
let Key = "a12a0cc115d3dfcb6b620f1e61ad29a1";

let temp_d = document.querySelectorAll(".temp_D");
let temp_n = document.querySelectorAll(".temp_N");
let timeUTC = document.querySelector(".time");
let city = document.querySelector("#city");
let currentTemp = document.querySelectorAll(".current-temp");

setInterval(() => { 
    const time = new Date();
    const hour = time.getHours(); //24hr
    const hour12 = hour >= 13 ? hour % 12 : hour //12hrs
    const min = time.getMinutes();
    const ampm = hour >= 12 ? "PM" : "AM"

    timeUTC.innerHTML = hour12 + ":" + min + `<span id="am_pm"> ${ampm}</span>`


}, 1000);

async function getWeatherData() {

    try {       
        let city = document.getElementById("city").value;
        // console.log(city);
        let res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=${7}&appid=${Key}&units=metric`);
        let res1 = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=7&appid=${Key}&units=metric`);
        let res2 = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Key}&units=metric`);
        // console.log(res1);
        // console.log(res2);
        
        


        
        let data = await res.json();
        let data1 = await res1.json();
        let data2 = await res2.json();

        console.log("data:", data);
        console.log("data:", data1);
        console.log("data:", data2);

        single(data2);
        seven(data1);
        showWeather(data);

        document.getElementById("gmap_canvas").setAttribute("src", `https://maps.google.com/maps?q=${city}&t=&z=13&ie=UTF8&iwloc=&output=embed`);

    }
    catch(err) {
        console.log(err);
    }
}


function showWeather(data) {
    console.log(data.list)   

    main.innerHTML =
        `<div class="wetherforcast">
    <img src="http://openweathermap.org/img/wn/02d@2x.png" alt="weather_icon" class="icon">
    <div class="day">Monday</div>
    <div class="temp_N">Night - ${data.list[0].main.temp_min}&#176; C</div>
    <div class="temp_D">Day -${data.list[0].main.temp_max}&#176; C</div>
</div>
<div class="wetherforcast">
    <div class="wItems">
        <div class="day">Tuesday</div>
        <img src="http://openweathermap.org/img/wn/02n@2x.png" alt="weather_icon" class="icon">
        <div class="temp_N">Night - ${data.list[1].main.temp_min}&#176; C</div>
        <div class="temp_D">Day -${data.list[1].main.temp_max}&#176; C</div>
    </div>
</div>
<div class="wetherforcast">
    <div class="wItems">
        <div class="day">Wednesday</div>
        <img src="http://openweathermap.org/img/wn/11d@2x.png" alt="weather_icon" class="icon">
        <div class="temp_N">Night - ${data.list[2].main.temp_min}&#176; C</div>
        <div class="temp_D">Day -${data.list[2].main.temp_max}&#176; C</div>
    </div>
</div>
<div class="wetherforcast">
    <div class="wItems">
        <div class="day">Thursday</div>
        <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="weather_icon" class="icon">
        <div class="temp_N">Night - ${data.list[3].main.temp_min}&#176; C</div>
        <div class="temp_D">Day -${data.list[3].main.temp_max}&#176; C</div>
    </div>
</div>
<div class="wetherforcast">
    <div class="wItems">
        <div class="day">Friday</div>
        <img src="http://openweathermap.org/img/wn/03n@2x.png" alt="weather_icon" class="icon">
        <div class="temp_N">Night - ${data.list[4].main.temp_min}&#176; C</div>
        <div class="temp_D">Day -${data.list[4].main.temp_max}&#176; C</div>
    </div>
</div>
<div class="wetherforcast">
    <div class="wItems">
        <div class="day">Saturday</div>
        <img src="http://openweathermap.org/img/wn/02d@2x.png" alt="weather_icon" class="icon">
        <div class="temp_N">Night - ${data.list[5].main.temp_min}&#176; C</div>
        <div class="temp_D">Day -${data.list[5].main.temp_max}&#176; C</div>
    </div>
</div>
<div class="wetherforcast">
    <div class="wItems">
        <div class="day">Sunday</div>
        <img src="http://openweathermap.org/img/wn/02d@2x.png" alt="weather_icon" class="icon">
        <div class="temp_N">Night - ${data.list[6].main.temp_min}&#176; C</div>
        <div class="temp_D">Day -${data.list[6].main.temp_max}&#176; C</div>
    </div>
</div>
</div>`;

}



// getWeatherData();

function single(x) {
    // console.log(x, city);
    document.querySelector(".right").innerHTML = "";
    document.querySelector(".left").innerHTML = "";

    let div1 = document.createElement("div");
    div1.setAttribute("id", "punebox");

    let img1 = document.createElement("img");
    img1.setAttribute("src", "https://www.seekpng.com/png/full/11-114649_location-map-pin-icon-location-emoji-png.png");
    img1.setAttribute("id", "mark");

    var cityName = document.createElement("p");
    cityName.setAttribute("id", "pune");
    cityName.textContent = ` ${x.name}`;

    div1.append(img1, cityName);
    // document.getElementById("punebox").append(cityName);

    let date = new Date()

    let temp = document.createElement("p");
    temp.style.fontSize = "55px";
    temp.textContent = `Temp: ${x.main.temp} °C`;

    let tempMax = document.createElement("p");
    tempMax.style.fontSize = "25px";
    tempMax.textContent = `Max. Temp: ${x.main.temp_max} °C`;

    let tempMin = document.createElement("p");
    tempMin.style.fontSize = "25px";
    tempMin.textContent = `Min. Temp: ${x.main.temp_min} °C`;

    let cloud = document.createElement("p");
    cloud.textContent = `Clouds: ${x.weather[0].description}`;
    cloud.style.fontSize = "20px";

    document.querySelector(".left").append(div1, date, temp, tempMax, tempMin, cloud);


    let hum = document.createElement("p");
    hum.textContent = `Humidity: ${x.main.humidity} %rh`;

    let pressure = document.createElement("p");
    pressure.textContent = `Pressure: ${x.main.pressure} millibars`;

    let seaLevel = document.createElement("p");
    seaLevel.textContent = `Sea Level: ${x.main.sea_level} millibars`;

    let wind = document.createElement("p");
    wind.textContent = `Wind Speed: ${x.wind.speed} km/h`;

    let cor = document.createElement("p");
    cor.textContent = "Coordinates :";
    cor.style.color = "red"
    cor.style.fontSize = "35px";
    cor.style.textDecoration = "underline"

    let lon = document.createElement("p");
    lon.textContent = `Longitude: ${x.coord.lon} ° E`;

    let lat = document.createElement("p");
    lat.textContent = `Latitute: ${x.coord.lat} ° N`;

    let visibility = document.createElement("p");
    visibility.textContent = `Visibility: ${x.visibility}`;

    document.querySelector(".right").append( pressure, hum, seaLevel, visibility,wind, cor, lon, lat);
}







// let key = "a12a0cc115d3dfcb6b620f1e61ad29a1";



// async function getWeatherData() {
//     try {
//         let city = document.getElementById("city").value

//         //`https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=${7}&appid=${key}&units=metric`

//         // let res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=${7}&appid=${key}&units=metric`);
//         // let data = await res.json();


//         // showWeather(data);
//     }
//     catch (error) {
//         console.log("error:", error)
//     }
// }

