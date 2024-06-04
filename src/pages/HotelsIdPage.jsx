import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import OtherHotels from "../components/HomePage/otherHotels/OtherHotels";
import Ubications from "../components/Mapa/Ubications";
import "./styles/HotelsIdPage.css";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import NavarLogin from "../components/LoginPage/NavarLogin";
import Slider from "../components/Slider/Slider";
import UserLoginAndLogaut from "../components/LoginPage/UserLoginAndLogaut";
import FormReserve from "../components/reservation/FormReserve";
import useCrud from "../hooks/useCrud";
import ReviewsCards from "../components/Reviews/ReviewsCards";

const HotelsIdPage = () => {
  const { id } = useParams();

  const url = `http://localhost:8080/hotels/${id}`;
  const [hotel, getHotel] = useFetch(url);

  useEffect(() => {
    getHotel();
  }, [id]);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const [review, getReview] = useCrud();

  useEffect(() => {
    const url = `http://localhost:8080/reviews?hotelId=${id}&userId=${user?.id}`;
    getReview(url);
  }, [id]);

  return (
    <div className="details">
      {localStorage.getItem("token") ? <UserLoginAndLogaut /> : <NavarLogin />}
      <div className="detail__header">
        <h2 className="details__name">{hotel?.name}</h2>
        <span className="number__rating">{hotel?.rating}</span>
        <h4 className="details__rating">
          {[...new Array(5)].map((star, index) =>
            index < Math.floor(hotel?.rating) ? (
              <AiFillStar className="estrellas" key={index} />
            ) : (
              <AiOutlineStar className="estrellas" key={index} />
            )
          )}
        </h4>
      </div>
      <div className="details__cont-aside">
        <div className="details__cont">
          <Slider hotel={hotel} />
        </div>
        <div className="details__cont">
          {hotel && <Ubications hotel={hotel} />}
        </div>
      </div>
      <section className="details__section">
        <h3 className="details__name-descriptions">
          {hotel?.city.name}, {hotel?.city.country}
        </h3>
        <p className="details__directions">
          <i className="bx bx-map"></i>
          <span>{hotel?.address}</span>
        </p>
        <p className="details__description">{hotel?.description}</p>
      </section>
      <div className="container__reservation">
        {localStorage.getItem("token") ? (
          <FormReserve hotel={hotel} />
        ) : (
          <span className="span__reserver">
            If you want to make a reservation, please{" "}
            <Link className="link" to={"/login"}>
              login
            </Link>{" "}
          </span>
        )}
      </div>
      <div>
        <OtherHotels hotel={hotel} />
      </div>
      <h3 className="title__comment">Comments</h3>
      <div className="detail__review">
        {review || review?.total !== 0 ? (
          review?.map((review, index) => (
            <ReviewsCards key={index} review={review} />
          ))
        ) : (
          <p className="sin__comments">❌ There are no comments 😪</p>
        )}
      </div>
    </div>
  );
};

export default HotelsIdPage;
