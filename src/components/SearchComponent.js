import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { fetchCities } from "../api/ApiServices";

const SearchComponent = ({ onSearchChange }) => {
  const [searchValue, setSearchValue] = useState(null);

  const loadOptions = async (inputValue) => {
    try {
      const citiesList = await fetchCities(inputValue);
      console.log("citiesList", citiesList)
      return {
        options: citiesList?.data.map((city) => {
          return {
            value: `${city.latitude} ${city.longitude}`,
            label: `${city.name}, ${city.countryCode}`,
          };
        }),
      };
    } catch (err) {
      console.log(err);
    }
  };

  const onChangeHandler = (enteredData) => {
    setSearchValue(enteredData);
    onSearchChange(enteredData);
  };
  return (
    <AsyncPaginate
      placeholder="Search for cities"
      debounceTimeout={600}
      value={searchValue}
      onChange={onChangeHandler}
      loadOptions={loadOptions || []}
    />
  );
};

export default SearchComponent;
