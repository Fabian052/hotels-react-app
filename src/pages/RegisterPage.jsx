import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import "./styles/Register.css";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchemaRegister } from "../components/ValidationsTheForm/userSchema";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchemaRegister),
  });

  const { registerUser } = useAuth();

  const navigate = useNavigate();

  const submit = (data) => {
    console.log(data);
    registerUser(data);
    reset({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      gender: "unknown",
    });
  };

  const handleNavigateLogin = () => {
    navigate("/login");
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
      <div className="form__total-container">
        <div className="form__container register_form">
          <form className="form__total" onSubmit={handleSubmit(submit)}>
            <div className="form__cont-name">
              <h2 className="form__name">Register</h2>
            </div>
            <label className="form__label">
              <span className="form__item">First Name</span>
              <input
                className="form__value"
                {...register("firstName")}
                type="text"
              />
              {errors.firstName?.message && (
                <p className="message__error">{errors.firstName?.message}</p>
              )}
            </label>
            <label className="form__label">
              <span className="form__item">Last Name</span>
              <input
                className="form__value"
                {...register("lastName")}
                type="text"
              />
              {errors.lastName?.message && (
                <p className="message__error">{errors.lastName?.message}</p>
              )}
            </label>
            <label className="form__label">
              <span className="form__item">Email</span>
              <input
                className="form__value"
                {...register("email")}
                type="email"
              />
              {errors.email?.message && (
                <p className="message__error">{errors.email?.message}</p>
              )}
            </label>
            <label className="form__label">
              <span className="form__item">Password</span>
              <input
                className="form__value"
                {...register("password")}
                type="password"
              />
              {errors.password?.message && (
                <p className="message__error">{errors.password?.message}</p>
              )}
            </label>
            <label className="form__label">
              <span className="form__item">Gender</span>
              <select className="form__option" {...register("gender")}>
                <option className="option__value" value="unKnown">
                  Unknown
                </option>
                <option className="option__value" value="male">
                  Male
                </option>
                <option className="option__value" value="female">
                  Female
                </option>
                <option className="option__value" value="other">
                  I prefer don't say it
                </option>
              </select>
              {errors.gender?.message && (
                <p className="message__error">{errors.gender?.message}</p>
              )}
            </label>
            <button className="form__btn">Submit</button>
          </form>
          <div className="info-register">
            <h2 className="register_detail2">Do you have an account?</h2>
            <div className="bnt__register-cont">
              <button onClick={handleNavigateLogin} className="btn-register">
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
