import { useEffect, useState } from "react";
import useCrud from "../hooks/useCrud";
import ReserveCard from "../components/ReservationPage/ReserveCard";
import "./styles/ReservationsPage.css";
import FormReviews from "../components/ReservationPage/FormReviews";
import { Link, useNavigate } from "react-router-dom";

const ReservationsPage = () => {
  const navigate = useNavigate();

  const [reviewOpen, setReviewOpen] = useState(true);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const [reserveSelected, setReserveSelected] = useState();

  const [menu, setMenu] = useState(false);

  const toggleMenu = () => {
    setMenu(!menu);
  };

  const [bookings, getBookings, , deleteBooking] = useCrud();

  useEffect(() => {
    const url = `http://localhost:8080/bookings`;
    getBookings(url);
  }, []);

  const handlePerfil = () => {
    navigate("/login");
  };

  return (
    <div>
      <div className="hotelNav__container">
        <div className="header__cont-logo">
          <h1 className="header__logo">
            <Link className="name__logo" to="/">
              Hotels<span>App</span>
            </Link>
          </h1>
        </div>
        <button onClick={toggleMenu} className="hotelNav__cont-responsi">
          <i className="bx bx-menu img--responsi"></i>
        </button>
        <nav className={`perfil__nav ${menu ? "isActivate" : ""}`}>
          <div className="perfil__name-cont">
            <div onClick={handlePerfil} className="perfil__name">
              <h2 className="perfil__names">{user?.firstName}</h2>
              <h2 className="perfil__names">{user?.lastName}</h2>
            </div>
          </div>
          <header onClick={handlePerfil} className="perfil__header-cont">
            <img
              className="perfil__img"
              src={user?.gender === "female" ? "/female.jpeg" : "/male.jpeg"}
              alt=""
            />
          </header>
        </nav>
      </div>
      <section className="reservationpage__container">
        <FormReviews
          reserveSelected={reserveSelected}
          reviewOpen={reviewOpen}
          setReviewOpen={setReviewOpen}
        />
        <h2 className="reservationpage__title">Reservations</h2>
        <div className="reservationpage__cards">
          {bookings?.map((reserve) => (
            <ReserveCard
              key={reserve.id}
              reserve={reserve}
              setReserveSelected={setReserveSelected}
              deleteBooking={deleteBooking}
              setReviewOpen={setReviewOpen}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ReservationsPage;
