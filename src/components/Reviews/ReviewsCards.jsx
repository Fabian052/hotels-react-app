import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import "./styles/ReviewsCards.css";

const ReviewsCards = ({ review }) => {
  return (
    <article className="comment__container">
      <h3 className="comment__name">
        {review.user.firstName} {review.user.lastName}
      </h3>
      <p className="comment__detail">{review.comment}</p>
      <h2 className="comment__rating">
        {[...new Array(5)].map((star, index) =>
          index < Math.floor(review.rating) ? (
            <AiFillStar key={index} />
          ) : (
            <AiOutlineStar key={index} />
          )
        )}
      </h2>
    </article>
  );
};

export default ReviewsCards;
