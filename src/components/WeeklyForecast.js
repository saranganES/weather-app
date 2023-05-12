import React from "react";
import SectionTitle from "./reusable/SectionTitle";
import WeeklyForecastCard from "./reusable/WeeklyForecastCard";
import { getWeekDays } from "../utilities/DatetimeUtils";

export default function WeeklyForecast({ weekForecast }) {
  const forecastDays = getWeekDays();
  return (
    <div className="col-6 mt-4">
      <SectionTitle title={"WEEKLY FORECAST"} />
      <div className="my-3">
        {weekForecast?.list?.map((item, idx) => (
          <WeeklyForecastCard
            item={item}
            day={forecastDays[idx]}
            description={item.description}
            key={idx}
          />
        ))}
      </div>
    </div>
  );
}
