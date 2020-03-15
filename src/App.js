import React from 'react';
import './App.css';

import 'weather-icons/css/weather-icons.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Weather from './app_component/weather.component';

function App() {
  return (
    <div className="App">
      <Weather/>
    </div>
  );
}

export default App;
