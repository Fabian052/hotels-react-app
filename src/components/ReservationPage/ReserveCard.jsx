import "./style/ReserveCard.css";

const ReserveCard = ({
  reserve,
  setReserveSelected,
  deleteBooking,
  setReviewOpen,
}) => {
  const ckeckIn = new Date(reserve.checkIn);
  const ckeckOut = new Date(reserve.checkOut);

  const reservationsDays = (ckeckOut - ckeckIn) / (1000 * 60 * 60 * 24);

  const handleDelete = () => {
    const url = `https://hotels-api.academlo.tech/bookings/${reserve.id}`;
    deleteBooking(url, reserve.id);
  };

  const handleReview = () => {
    const obj = {
      ...reserve,
      reservationsDays,
      subtotal: reserve.hotel.price * reservationsDays,
    };
    setReserveSelected(obj);
    setReviewOpen(false);
  };

  return (
    <article className="reserver__container">
      <div className="reserver__sub-cont">
        <header className="reserver__header">
          <img
            className="reserver__img"
            src={reserve.hotel.images[0].url}
            alt=""
          />
        </header>
        <section className="reserver__hotel">
          <h3 className="reserver__name">{reserve.hotel.name}</h3>
          <div className="reserver__city">
            {reserve.hotel.city.name}, {reserve.hotel.city.country}
          </div>
          <div onClick={handleReview} className="reserver__coment">
            Rate and comment this visit...
          </div>
        </section>
      </div>
      <section className="reserver__info">
        <ul className="reserver__list">
          <li className="reserver__item">
            <span className="reserver__text1">Reservation Days</span>
            <span className="reserver__number1">{reservationsDays}</span>
          </li>
          <li className="reserver__item">
            <span className="reserver__text2">subtotal Price</span>
            <span className="reserver__number">
              USD {reserve.hotel.price * reservationsDays}
            </span>
          </li>
        </ul>
      </section>
      <footer className="reserver__btn-cont">
        <button onClick={handleDelete} className="reserver__btn">
          <i className="bx bx-trash btn-img"></i>
        </button>
      </footer>
    </article>
  );
};

export default ReserveCard;
