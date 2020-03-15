import React from 'react';
import './App.css';

import 'weather-icons/css/weather-icons.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Weather from './app_component/weather.component';

//api.openweathermap.org/data/2.5/weather?q=London,uk
const API_key = '68d18430c8773d7e121b1ef22184323d';

class App extends React.Component {
  constructor() {
    super();
    this.state={
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
    };
    this.gerWeather();
  }

  gerWeather = async () => {
    const api_call = await fetch('http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=68d18430c8773d7e121b1ef22184323d');

    const response = await api_call.json();

    console.log(response);

    this.setState({
      city: response.name,
      country: response.sys.country,
    })
  }
    render() {
  return (
    <div className="App">
      <Weather city={this.state.city} country={this.state.country}/>
    </div>
  );
  }
}

export default App;
