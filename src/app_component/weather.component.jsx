import React from 'react';

const Weather = (props) => {
   return (
      <div className="container">
         <div className="cards">
            <h1>{props.city},{props.country}</h1>
            <h5 className="py-4">
               <i className="wi wi-day-sunny display-1"></i>
            </h5>
            <h2 className="py-2">25&deg;</h2>

            {minmaxTemp(24, 19)}

            <h3>Slow Rein</h3>
         </div>
      </div>
   );
}

function minmaxTemp(min,max) {
   return (
      <h3>
         <span className="px-4">{min}&deg;</span>
         <span className="px-4">{max}&deg;</span>
      </h3>
   );
}

export default Weather;