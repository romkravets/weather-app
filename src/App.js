import React from 'react';
import './App.css';

import 'weather-icons/css/weather-icons.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Weather from './app_component/weather.component';
import Form from './app_component/form.component';

//api.openweathermap.org/data/2.5/weather?q=London,uk
const API_key = '68d18430c8773d7e121b1ef22184323d';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: undefined,
      temp_min: undefined,
      speed: undefined,
      description: '',
      error: false,

    };

    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    }
  }

  calCelsius(temp) {
    let cell = Math.floor(temp - 273.15);
    return cell;
  }

  gerWeatherIcon(icons, rengeid) {
    switch(true) {
      case rengeid >= 200 && rengeid <= 232:
        this.setState({icon: this.weatherIcon.Thunderstorm});
        break;
      case rengeid >= 300 && rengeid <= 321:
        this.setState({icon: this.weatherIcon.Drizzle});
        break;
      case rengeid >= 500 && rengeid <= 531:
        this.setState({icon: this.weatherIcon.Rain});
        break;
      case rengeid >= 600 && rengeid <= 622:
          this.setState({icon: this.weatherIcon.Snow});
        break;
      case rengeid >= 701 && rengeid <= 781:
          this.setState({icon: this.weatherIcon.Atmosphere});
        break;
      case rengeid === 800:
          this.setState({icon: this.weatherIcon.Clear});
        break;
      case rengeid === 801 && rengeid <= 804:
          this.setState({icon: this.weatherIcon.Clouds});
        break;
      default:
        this.setState({icon: this.weatherIcon.Clouds});
    }
  }

  gerWeather = async (e) => {

    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    console.log(city)
    console.log(country)

    if(city && country) {

    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${API_key}`);

    const response = await api_call.json();

    console.log(response);

    this.setState({
      city: `${response.name},${response.sys.country}`,
      celsius: this.calCelsius(response.main.temp),
      temp_max: this.calCelsius(response.main.temp_max),
      temp_min: this.calCelsius(response.main.temp_min),
      speed: response.wind.speed,
      description: response.weather[0].description,
      icon: this.weatherIcon.Thunderstorm,
      error: false,
    });

    this.gerWeatherIcon(this.weatherIcon, response.weather[0].id);
  } else {
    this.setState({error: true,})
  }
};
    render() {
  return (
    <div className="App">
      <Form loadweather={this.gerWeather} error={this.state.error}/>
      <Weather
      city={this.state.city}
      country={this.state.country}
      temp_celsius={this.state.celsius}
      temp_max={this.state.temp_max}
      temp_min={this.state.temp_min}
      speed={this.state.speed}
      description={this.state.description}
      weatherIcon={this.state.icon}
      />
    </div>
  );
  }
}

export default App;
