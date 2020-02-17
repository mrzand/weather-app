import React from "react";
import "./card.css";

const Card = props => {
  return (
    <div className="card-container">
      {props.temp_celsius ? (
        <div className="descriptin-block">
          <i className={`wi ${props.weatherIcon} card-icon`} />
          <div className="description-wrapper">
            <p className="card-temperature">{props.temp_celsius}&deg;</p>
            <p className="card-city">{props.cityname}</p>
            <p className="card-description">
              {props.description.charAt(0).toUpperCase() +
                props.description.slice(1)}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Card;
