import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./slyle/NavarLogin.css";

const NavarLogin = () => {
  const [menu, setMenu] = useState(false);

  const toggleMenu = () => {
    setMenu(!menu);
  };

  return (
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
      <nav className={`hotelNav__navbar ${menu ? "isActivate" : ""}`}>
        <ul className="hotelNav__list">
          <li className="hotelNav__item">
            <Link className="label__item" to="/reservations">
              {" "}
              Reservations{" "}
            </Link>
          </li>
          <li className="hotelNav__item">
            <Link className="label__item" to="/register">
              Register
            </Link>
          </li>
          <li className="hotelNav__item">
            <Link className="label__item" to="/login">
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavarLogin;
