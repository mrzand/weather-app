import React from "react";
import "./App.css";
import Form from "./components/form/form";
import Card from "./components/weather-card/card";
import "weather-icons/css/weather-icons.css";

const API_KEY = "429736441cf3572838aa10530929f7cd";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: "",
      country: "",
      icon: "",
      main: "",
      celsius: "",
      description: "",
      error: false,
      cardActive: false,
      citiesArray: []
    };

    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    };
  }

  getWeatherIcon(icons, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
        this.setState({ icon: icons.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: icons.Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 521:
        this.setState({ icon: icons.Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: icons.Snow });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon: icons.Atmosphere });
        break;
      case rangeId === 800:
        this.setState({ icon: icons.Clear });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon: icons.Clouds });
        break;
      default:
        this.setState({ icon: icons.Clouds });
    }
  }

  getCelsius(temp) {
    let celsius = Math.floor(temp - 273.15);
    return celsius;
  }

  getWeather = async e => {
    e.preventDefault();

    const city = e.target.elements.city.value.toLowerCase();

    try {
      const api_call = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );

      const response = await api_call.json();

      this.setState({
        city: `${response.name}, ${response.sys.country}`,
        country: response.sys.country,
        main: response.weather[0].main,
        celsius: this.getCelsius(response.main.temp),
        description: response.weather[0].description,
        error: false,
        cardActive: true
      });

      this.getWeatherIcon(this.weatherIcon, response.weather[0].id);

      var oldItems = JSON.parse(localStorage.getItem("citiesArray")) || [];

      var newItem = {
        city: city
      };

      oldItems.push(newItem);

      localStorage.setItem("citiesArray", JSON.stringify(oldItems));
    } catch (error) {
      this.setState({
        error: true
      });
    }
  };

  render() {
    return (
      <>
        <h1>Weather App</h1>
        <div className={`card ${this.state.cardActive ? "active" : ""}`}>
          <Form loadweather={this.getWeather} error={this.state.error} />
          <Card
            cityname={this.state.city}
            weatherIcon={this.state.icon}
            temp_celsius={this.state.celsius}
            description={this.state.description}
          />
          {this.state.error ? (
            <div className="card-error">
              <p>City not found</p>
            </div>
          ) : null}
        </div>
      </>
    );
  }
}

export default App;
