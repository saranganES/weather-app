import React from "react";
import SectionTitle from "./reusable/SectionTitle";

export default function AirConditions({todayWeather}) {
  return (
    <div className="my-4 py-4">
      <SectionTitle title={"AIR CONDITIONS"} />
      <div className="row mt-4">
        <div className="col-3">
          <span>
            <img className="img-fluid img-25" src="assets/temp.svg" />
            Real Feel
          </span>
          <p className="mx-1">{Math.round(todayWeather?.main?.feels_like)} °C</p>
        </div>
        <div className="col-3">
          <span>
            <img className="img-fluid img-25 mx-1" src="assets/wind.svg" />
            Wind
          </span>
          <p className="mx-1">{todayWeather?.wind?.speed} m/s</p>
        </div>
        <div className="col-3">
          <span>
            <img className="img-fluid img-25 mx-1" src="assets/cloud.svg" />
            Clouds
          </span>
          <p className="mx-1">{Math.round(todayWeather?.clouds?.all)} %</p>
        </div>
        <div className="col-3">
          <span>
            <img className="img-fluid img-25 mx-1" src="assets/moisture.svg" />
            Humidity
          </span>
          <p className="mx-1">{Math.round(todayWeather?.main?.humidity)} %</p>
        </div>
      </div>
    </div>
  );
}
