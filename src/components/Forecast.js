import React from "react";
import CurrentWeather from "./CurrentWeather";
import AirConditions from "./AirConditions";
import TodayForecast from "./TodayForecast";

export default function Forecast({todayWeather, forecastList}) {
  return (
    <div className="col-6">
      <CurrentWeather todayWeather={todayWeather}/>
      <AirConditions todayWeather={todayWeather}/>
      <TodayForecast todayWeather={todayWeather} forecastList={forecastList}/>
    </div>
  );
}
