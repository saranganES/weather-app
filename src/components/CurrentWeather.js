import React from 'react';
import SectionTitle from './reusable/SectionTitle';
import { getDayMonthFromDate } from '../utilities/DatetimeUtils';
import { iconManage } from '../utilities/DataUtils';

export default function CurrentWeather({ todayWeather }) {
  console.log('todayWeather', todayWeather);
  const dayMonth = getDayMonthFromDate();
  return (
    <div className='my-4'>
      <SectionTitle title={'CURRENT WEATHER'} />
      <div className='row my-4'>
        <div className='col-4'>
          <div>{todayWeather?.city}</div>
          <div>Today {dayMonth}</div>
        </div>
        <div className='col-4 d-flex justify-content-center'>
          <div>
            <div>{Math.round(todayWeather?.main?.temp)} °C</div>
            <div>{todayWeather?.weather[0]?.description}</div>
          </div>
        </div>
        <div className='col-4 d-flex justify-content-center'>
          <div className='badge bg-secondary'>
            <img
              className='img-fluid img-50'
              src={
                'http://openweathermap.org/img/wn/' +
                todayWeather?.weather[0]?.icon +
                '@2x.png'
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
