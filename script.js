window.addEventListener("load", () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span')

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {

            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/5303332d3f30e20a2d6a9433d29ac54d/${lat},${long}`;

            //convert to JSON
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    const {temperature, summary, icon} = data.currently;
                    //Set DOM Elements from the API
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    //Set Icon (not working)
                    //setIcons(icon, document.getElementsByClassName(".icon"));
                    
                    //formula for Celsius
                    let celsius = (temperature - 32) * (5/9);
                    //change temreture to Celsium/Farenhite
                    temperatureSection.addEventListener('click', ()=> {
                        
                        if (temperatureSpan.textContent === "F") {
                            temperatureSpan.textContent ="C";
                            temperatureDegree.textContent = Math.floor(celsius);
                        } else {
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;
                        }
                    });
                });
        });
    }
//https://darkskyapp.github.io/skycons/
/* Not working  setIcons
 function setIcons(icon, iconID) {
      const skycons = new Skycons ({ color: "white" });
      const currentIcon = icon.replace(/-/g, "_").toUpperCase();
      skycons.play();
      return skycons.set(iconID, Skyсons[currentIcon]); 
  }  */
});