import React from "react";
import { useForm } from "react-hook-form";
import useCrud from "../../hooks/useCrud";
import "./style/FormReview.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchemaReview } from "../ValidationsTheForm/userSchema";

const FormReviews = ({ reserveSelected, reviewOpen, setReviewOpen }) => {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchemaReview),
  });

  const [, , createReview] = useCrud();

  const submit = (data) => {
    const url = "http://localhost:8080/reviews";
    const newObj = {
      rating: +data.rating,
      comment: data.comment,
      hotelId: reserveSelected?.hotel.id,
    };
    createReview(url, newObj);
    reset({
      rating: "",
      comment: "",
    });
  };

  const reviewClose = () => {
    setReviewOpen(true);
  };

  return (
    <div className={`modal__padre fondo ${reviewOpen ? "review__modal" : ""}`}>
      <article className="review__container">
        <div onClick={reviewClose} className="review__close">
          <i className="bx bx-x img-close"></i>
        </div>
        <h1 className="review__title">Reserve</h1>
        <header className="review__img-cont">
          <img
            className="img__modal"
            src={reserveSelected?.hotel.images[0].url}
            alt=""
          />
        </header>
        <section className="review__info">
          <h3 className="review__name">{reserveSelected?.hotel.name}</h3>
          <div className="review__city">
            {reserveSelected?.hotel.city.name},{" "}
            {reserveSelected?.hotel.city.country}
          </div>
        </section>
        <section className="review__info-reserver">
          <ul className="review__list">
            <li className="review__item">
              <span className="review__label">Reservation Days</span>
              <span className="review__value">
                {reserveSelected?.reservationsDays}
              </span>
            </li>
            <li className="review__item">
              <span className="review__label">subtotal Price</span>
              <p>
                USD
                <span className="review__value">
                  {reserveSelected?.subtotal}
                </span>
              </p>
            </li>
          </ul>
        </section>
        <form className="review__form-cont" onSubmit={handleSubmit(submit)}>
          <label className="review__form-label">
            <span className="review__form-item">Rating</span>
            <select className="review__select" {...register("rating")}>
              <option value=""></option>
              <option value="5">⭐⭐⭐⭐⭐</option>
              <option value="4">⭐⭐⭐⭐</option>
              <option value="3">⭐⭐⭐</option>
              <option value="2">⭐⭐</option>
              <option value="1">⭐</option>
            </select>
            {errors.rating?.message && (
              <p className="review__errors">{errors.rating?.message}</p>
            )}
          </label>
          <label className="review__form-label">
            <span className="review__form-item">Comments</span>
            <textarea
              className="review__text-area"
              {...register("comment")}></textarea>
            {errors.comment?.message && (
              <p className="review__errors">{errors.comment?.message}</p>
            )}
          </label>
          <button className="review__form-btn">Submit</button>
        </form>
      </article>
    </div>
  );
};

export default FormReviews;
