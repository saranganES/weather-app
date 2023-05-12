import React from "react";
import { iconManage } from "../../utilities/DataUtils";

export default function SingleForecastCard({item, data}) {
  return (
    <span class="col-4 mx-4 my-4 badge w-25 bg-light">
      <div className="my-2 fs-6 text-dark fw-bold">{item?.time}</div>
      <img className="img-fluid img-50" src={`/assets/${iconManage(item?.icon)}.svg`} />
      <div className="my-2 fs-6 text-dark fw-bold">{item?.temperature}</div>
    </span>
  );
}
