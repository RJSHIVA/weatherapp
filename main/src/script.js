// Get references to HTML elements
let result = document.getElementById("result"); // The element to display weather details
let searchBtn = document.getElementById("search-btn"); // The button to trigger weather search
let cityRef = document.getElementById("city"); // The input field for the city name

// Function to fetch weather details from API and display them
let getWeather = () => {
  let cityValue = cityRef.value; // Get the value entered in the city input field

  // If the input field is empty
  if (cityValue.length == 0) {
    result.innerHTML = `<h3 class="msg">Please enter a city name</h3>`; // Display a message asking to enter a city name
  }
  // If the input field is NOT empty
  else {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric`; // Construct the URL for the weather API using the entered city name and API key

    cityRef.value = ""; // Clear the input field

    // Fetch weather data from the API
    fetch(url)
      .then((resp) => resp.json()) // Convert the response to JSON format
      .then((data) => {
        // Display the weather data in the result element
        result.innerHTML = `
        <h2>${data.name}</h2>
        <h4 class="weather">${data.weather[0].main}</h4>
        <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
        <h4 class="desc">${data.weather[0].description}</h4>
         
        <h1>${data.main.temp} &#176;</h1>
        
        <div class="temp-container">
       
            <div>
                <h4 class="title">min</h4>
                <h4 class="temp">${data.main.temp_min}&#176;</h4>
            </div>
            <div>
          
                <h4 class="title">max</h4>
                <h4 class="temp">${data.main.temp_max}&#176;</h4>
            </div>
        </div>
        `;
      })
      .catch(() => {
        result.innerHTML = `<h3 class="msg">City not found</h3>`; // Display a "City not found" message if the city name is not valid
      });
  }
};

searchBtn.addEventListener("click", getWeather); // Add event listener to the search button to trigger the getWeather function when clicked
window.addEventListener("load", getWeather); // Add event listener to the window's load event to call the getWeather function when the page finishes loading
