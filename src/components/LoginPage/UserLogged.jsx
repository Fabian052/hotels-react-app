import { Link } from "react-router-dom";
import "./slyle/UserLogged.css";

const UserLogged = ({ setUser, user }) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser();
  };

  return (
    <div>
      <div className="hotelNav__container">
        <div className="header__cont-logo2">
          <h1 className="header__logo2">
            <Link className="name__logo-perfil" to="/">
              Hotels<span>App</span>
            </Link>
          </h1>
        </div>
      </div>
      <article className="perfil">
        <header className="perfil__header-img">
          <img
            className="img__perfil"
            src={user.gender === "female" ? "/female.jpeg" : "/male.jpeg"}
            alt="Image of user genre"
          />
        </header>
        <h2 className="perfil__names">
          {user.firstName} {user.lastName}
        </h2>
        <h3 className="perfil__email">{user.email}</h3>
        <button className="perfil__btn" onClick={handleLogout}>
          Logout
        </button>
      </article>
    </div>
  );
};

export default UserLogged;
