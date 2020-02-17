import React from "react";
import "./form.css";
import search from "../../search.svg";

const Form = props => {
  return (
    <div className="card-form">
      <form onSubmit={props.loadweather}>
        <div className="card-form-row">
          <input
            type="text"
            className="form-control"
            placeholder="city"
            name="city"
            autoComplete="on"
            required
          />
          <button className="card-button">
            <img src={search} alt="search" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
