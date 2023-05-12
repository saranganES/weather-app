import React from "react";
import { iconManage } from "../../utilities/DataUtils";

export default function WeeklyForecastCard({item, day, description}) {
  return (
    <div className="alert alert-secondary">
      <div className="row">
        <div className="col-4">
          <div>
            <div className="fw-bold fs-6">{day}</div>
            <span>
              <img className="img-fluid img-25" src={`/assets/${iconManage(Math.round(item?.temp))}.svg`} />{" "}
              {description}
            </span>
          </div>
        </div>
        <div className="col-4">
          <div>
            <span>
              <img className="img-fluid mx-1 my-1 img-15" src="/assets/temp.svg" /> {Math.round(item?.temp)} °C
            </span>
          </div>
          <div>
            <span>
              <img className="img-fluid mx-1 my-1 img-15" src="/assets/cloud.svg" /> {item?.clouds} %
            </span>
          </div>
        </div>
        <div className="col-4">
          <div>
            <span>
              <img className="img-fluid mx-1 my-1 img-15" src="/assets/wind.svg" /> {item?.wind}
              m/s
            </span>
          </div>
          <div>
            <span>
              <img className="img-fluid mx-1 my-1 img-15" src="/assets/moisture.svg" /> {item?.humidity}
              %
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
