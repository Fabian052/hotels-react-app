import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import useFetch from "../../hooks/useFetch";
import { getHotelsThunk } from "../../store/states/Hotels.slice";
import "./styles/CategoryFilter.css";

const CategoryFilter = () => {
  const url = "https://hotels-api.academlo.tech/cities";
  const [cities, getCities] = useFetch(url);

  const dispatch = useDispatch();

  useEffect(() => {
    getCities();
  }, []);

  const handleFilterCity = (id) => {
    let url;

    if (id) {
      url = `https://hotels-api.academlo.tech/hotels?cityId=${id}`;
    } else {
      url = "https://hotels-api.academlo.tech/hotels";
    }

    dispatch(getHotelsThunk(url));
  };

  return (
    <section className="cities__filt-cont">
      <div className="cities__filt-name-cont">
        <h3 className="cities__name"> Filter Cities</h3>
      </div>
      <div className="cities__items-total" onClick={() => handleFilterCity()}>
        All cities
      </div>
      <ul className="cities__filt-list">
        {cities?.map((city) => (
          <div key={city.id}>
            <li
              className="cities__items"
              onClick={() => handleFilterCity(city.id)}
              key={city.id}>
              {city.name}
            </li>
          </div>
        ))}
      </ul>
    </section>
  );
};

export default CategoryFilter;
