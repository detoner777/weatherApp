window.addEventListener("load", () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');

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
                    //Set Icon
                    setIcons(icon, document.querySelector('.icon'));

                });
        });
    }
//https://darkskyapp.github.io/skycons/
  function setIcons(icon, iconID) {
      const skycons = new Skycons({color: "white" });
      const currentIcon = icon.replace(/-/g, "_").toUpperCase();
      skycons.play();
      return skyсons.set(iconID, Skyсons[currentIcon]); 
  }  
});