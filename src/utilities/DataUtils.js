export function groupBy(key) {
  return function group(array) {
    return array.reduce((acc, obj) => {
      const property = obj[key];
      const { date, ...rest } = obj;
      acc[property] = acc[property] || [];
      acc[property].push(rest);
      return acc;
    }, {});
  };
}

export function getAverage(array, isRound = true) {
  let average = 0;
  if (isRound) {
    average = Math.round(array.reduce((a, b) => a + b, 0) / array.length);
    if (average === 0) {
      average = 0;
    }
  } else average = (array.reduce((a, b) => a + b, 0) / array.length).toFixed(2);

  return average;
}

export function getMostFrequentWeather(arr) {
  const hashmap = arr.reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});
  return Object.keys(hashmap).reduce((a, b) =>
    hashmap[a] > hashmap[b] ? a : b
  );
}

export const getWeekForecastWeather = (response) => {
  let foreacast_data = [];
  let descriptions_data = [];

  if (!response || Object.keys(response).length === 0 || response.cod === "404")
    return [];
  else
    response?.list.slice().map((item, idx) => {
      descriptions_data.push({
        description: item.weather[0].description,
        date: item.dt_txt.substring(0, 10),
      });
      foreacast_data.push({
        date: item.dt_txt.substring(0, 10),
        temp: item.main.temp,
        humidity: item.main.humidity,
        wind: item.wind.speed,
        clouds: item.clouds.all,
      });

      return { idx, item };
    });

  const groupByDate = groupBy("date");
  let grouped_forecast_data = groupByDate(foreacast_data);
  let grouped_forecast_descriptions = groupByDate(descriptions_data);

  const description_keys = Object.keys(grouped_forecast_descriptions);

  let dayDescList = [];

  description_keys.forEach((key) => {
    let singleDayDescriptions = grouped_forecast_descriptions[key].map(
      (item) => item.description
    );
    let mostFrequentDescription = getMostFrequentWeather(singleDayDescriptions);
    dayDescList.push(mostFrequentDescription);
  });

  const forecast_keys = Object.keys(grouped_forecast_data);
  let dayAvgsList = [];

  forecast_keys.forEach((key, idx) => {
    let dayTempsList = [];
    let dayHumidityList = [];
    let dayWindList = [];
    let dayCloudsList = [];

    for (let i = 0; i < grouped_forecast_data[key].length; i++) {
      dayTempsList.push(grouped_forecast_data[key][i].temp);
      dayHumidityList.push(grouped_forecast_data[key][i].humidity);
      dayWindList.push(grouped_forecast_data[key][i].wind);
      dayCloudsList.push(grouped_forecast_data[key][i].clouds);
    }

    dayAvgsList.push({
      date: key,
      temp: getAverage(dayTempsList),
      humidity: getAverage(dayHumidityList),
      wind: getAverage(dayWindList, false),
      clouds: getAverage(dayCloudsList),
      description: dayDescList[idx],
    });
  });

  return dayAvgsList;
};

export const getTodayForecastWeather = (
  response,
  current_date,
  current_datetime
) => {
  let all_today_forecasts = [];

  if (!response || Object.keys(response).length === 0 || response.cod === "404")
    return [];
  else
    response?.list.slice().map((item) => {
      if (item.dt_txt.startsWith(current_date.substring(0, 10))) {
        if (item.dt > current_datetime) {
          all_today_forecasts.push({
            time: item.dt_txt.split(" ")[1].substring(0, 5),
            icon: item.weather[0].icon,
            temperature: Math.round(item.main.temp) + " °C",
          });
        }
      }
      return all_today_forecasts;
    });

  if (all_today_forecasts.length < 7) {
    return [...all_today_forecasts];
  } else {
    return all_today_forecasts.slice(-6);
  }
};

export const iconManage = (temp, icon) => {
  if (
    (temp > 30 && temp < 35) ||
    icon == "01d" ||
    icon == "01n" ||
    icon == "02d" ||
    icon == "02n" ||
    icon == "03d" ||
    icon == "03n" ||
    icon == "04d" ||
    icon == "04n"
  ) {
    return "cloud-sun";
  } else if (
    (temp < 30 && temp > 25) ||
    icon == "11d" ||
    icon == "11n" ||
    icon == "10n" ||
    icon == "10d" ||
    icon == "09n" ||
    icon == "09d"
  ) {
    return "cloud-rain";
  } else if (
    (temp < 25 && temp > 0) ||
    icon == "13d" ||
    icon == "13n" ||
    icon == "50d" ||
    icon == "50n" ||
    icon == "unknown"
  ) {
    return "cloud-snow";
  } else {
    return "cloud";
  }
};