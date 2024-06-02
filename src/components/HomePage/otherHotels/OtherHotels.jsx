import React, { useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
import HotelCard from "../HotelCard";
import "./styles/OtherHotels.css";

const OtherHotels = ({ hotel }) => {
  const url = `http://localhost:8080/hotels?cityId=${hotel?.cityId}`;
  const [hotelsInCity, getHotelsInCity] = useFetch(url);

  useEffect(() => {
    if (hotel) {
      getHotelsInCity();
    }
  }, [hotel]);

  return (
    <section className="hotel__container-total">
      <div className="other__title">
        <h3>
          Other Hotels in{" "}
          <span className="solo-nombre">{hotel?.city.name}</span>
        </h3>
      </div>
      <div className="hotel__container">
        {hotelsInCity
          ?.filter((hotelInfo) => hotelInfo.id !== hotel.id)
          .map((hotelInfo) => (
            <div key={hotelInfo.id} className="hotel__cards">
              <HotelCard hotel={hotelInfo} />
            </div>
          ))}
      </div>
    </section>
  );
};

export default OtherHotels;
