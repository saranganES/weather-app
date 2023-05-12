import React, { useState } from "react";
import SearchComponent from "./SearchComponent";
import Forecast from "./Forecast";
import WeeklyForecast from "./WeeklyForecast";
import {
  getTodayForecastWeather,
  getWeekForecastWeather,
} from "../utilities/DataUtils";
import { fetchWeatherData } from "../api/ApiServices";
import { transformDateFormat } from "../utilities/DatetimeUtils";
import Loading from "./reusable/Loading";

export default function Card() {
  const [todayWeather, setTodayWeather] = useState(null);
  const [todayForecast, setTodayForecast] = useState([]);
  const [weekForecast, setWeekForecast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const searchChangeHandler = async (enteredData) => {
    const [latitude, longitude] = enteredData.value.split(" ");

    setIsLoading(true);

    const currentDate = transformDateFormat();
    const date = new Date();
    let dt_now = Math.floor(date.getTime() / 1000);

    try {
      const [todayWeatherResponse, weekForecastResponse] =
        await fetchWeatherData(latitude, longitude);
      const all_today_forecasts_list = getTodayForecastWeather(
        weekForecastResponse,
        currentDate,
        dt_now
      );

      const all_week_forecasts_list =
        getWeekForecastWeather(weekForecastResponse);

      setTodayForecast([...all_today_forecasts_list]);
      setTodayWeather({ city: enteredData.label, ...todayWeatherResponse });
      setWeekForecast({
        city: enteredData.label,
        list: all_week_forecasts_list,
      });
    } catch (error) {
      setError(true);
    }

    setIsLoading(false);
  };

  return (
    <div className="card mx-auto w-75 ">
      <div className="card-header bg-dark bg-gradient text-center text-white">
        <h4 className="fw-bold">Weather Forecating App</h4>
      </div>
      <div className="card-body pt-4">
        {isLoading ? (
          <div className="d-flex justify-content-center">
            <Loading />
          </div>
        ) : (
          <>
            <SearchComponent onSearchChange={searchChangeHandler} />
            {todayWeather == null ? (
              <>
                <div className="my-4" />
                <div className="d-flex justify-content-center my-4">
                  <img
                    className="img-fluid img-100 "
                    src="assets/weather.png"
                  />
                </div>
                <p className="text-center">Explore current weather data</p>
              </>
            ) : (
              <>
                <div className="row mt-4">
                  <Forecast
                    todayWeather={todayWeather}
                    forecastList={todayForecast}
                  />
                  <WeeklyForecast weekForecast={weekForecast} />
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
