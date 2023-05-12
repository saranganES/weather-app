import React from "react";
import SectionTitle from "./reusable/SectionTitle";
import SingleForecastCard from "./reusable/SingleForecastCard";

export default function TodayForecast({todayWeather, forecastList}) {
  return (
    <div className="my-4">
      <SectionTitle title={"TODAY'S FORECAST"} />
      <p className="text-primary">{forecastList?.length} available forecasts</p>
      <div className="row my-3">
      {forecastList?.map((item, i)=><SingleForecastCard item={item} data={todayWeather} key={i}/>)}
      </div>
    </div>
  );
}
