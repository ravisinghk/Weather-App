//Api Key:  3d1bec7fc1ec50451261c6f6831cec98


let apiKey = "3d1bec7fc1ec50451261c6f6831cec98";



let temp = document.getElementById("temp");
let place = document.getElementById("place");
let description = document.getElementById("description");
let humidity = document.getElementById("humidity-value");
let windspeed = document.getElementById("windspeed-value");
let icon = document.getElementById("icon");

function getWeather(cityName){
    let city = cityName
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    fetch(url)
    .then(res => res.json())
    .then(data => {
        try{

            console.log(city.length)

            if(city.length >8 ){
                let citySufx = city.slice(-3);
                let citySuffix = citySufx.toLowerCase();
                city = city.slice(0,5) + "..." + citySuffix;
            }

            document.getElementById("place").classList.remove("catch-place");
            document.getElementById("details-div").classList.remove("catch-details");
            document.getElementById("temp").classList.remove("catch-temp");
            document.getElementById("temp").classList.add("degree-symbol");

            temp.innerHTML = Math.round(data.main.temp);   // this all can also be done by object destructuring
            place.innerHTML = city;
            description.innerHTML = data.weather[0].main;
            humidity.innerHTML = data.main.humidity;
            icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
            windspeed.innerHTML = Math.round(data.wind.speed*18/5);
        }
        catch(e){ 
            console.log("err")
            console.log(e);
            document.getElementById("temp").classList.remove("degree-symbol");
            document.getElementById("temp").innerHTML = "City Not Found!";
            document.getElementById("place").classList.add("catch-place");
            document.getElementById("temp").classList.add("catch-temp");
            document.getElementById("details-div").classList.add("catch-details");
        }
        
    })

    document.getElementById("search-input").value = '';
}

getWeather("Mumbai");

document.getElementById("search-btn").addEventListener("click", function(){

    city = document.getElementById("search-input").value;

    getWeather(city);
})


document.getElementById("search-input").addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("search-btn").click();
    }
  });


