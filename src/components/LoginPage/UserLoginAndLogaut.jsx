import React, { useState } from "react";
import "./slyle/UserLoginAndLogaut.css";
import { Link, useNavigate } from "react-router-dom";

const UserLoginAndLogaut = () => {
  const [menu, setMenu] = useState(false);

  const toggleMenu = () => {
    setMenu(!menu);
  };

  const navigate = useNavigate();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const handlePerfil = () => {
    navigate("/login");
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

      <nav className={`perfil__nav ${menu ? "isActivate" : ""}`}>
        <div className="perfil__name-cont">
          <div className="perfil__name">
            <h2 className="perfil__names">{user?.firstName}</h2>
            <h2 className="perfil__names">{user?.lastName}</h2>
          </div>
          <h2 className="link__reservations">
            <Link className="label__reserver" to="/reservations">
              {" "}
              Reservations{" "}
            </Link>
          </h2>
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
  );
};

export default UserLoginAndLogaut;
