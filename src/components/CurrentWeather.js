import React from "react";
import SectionTitle from "./reusable/SectionTitle";
import { getDayMonthFromDate } from "../utilities/DatetimeUtils";
import { iconManage } from "../utilities/DataUtils";

export default function CurrentWeather({todayWeather}) {
  const dayMonth = getDayMonthFromDate();
  return (
    <div className="my-4">
      <SectionTitle title={"CURRENT WEATHER"} />
      <div className="row my-4">
        <div className="col-4">
          <div>{todayWeather?.city}</div>
          <div>Today {dayMonth}</div>
        </div>
        <div className="col-4">
          <div>{Math.round(todayWeather?.main?.temp)} °C</div>
          <div>{todayWeather?.weather[0]?.description}</div>
        </div>
        <div className="col-4">
          <img className="img-fluid img-50" src={`/assets/${iconManage(todayWeather?.main.temp)}.svg`} />
        </div>
      </div>
    </div>
  );
}
