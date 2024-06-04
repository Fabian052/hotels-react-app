import { useForm } from "react-hook-form";
import useCrud from "../../hooks/useCrud";
import "./styles/FormReserve.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchemaDate } from "../ValidationsTheForm/userSchema";
import { useState } from "react";
import { Toaster, toast } from "sonner";

const FormReserve = ({ hotel }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchemaDate),
  });

  const [, , createReserver] = useCrud();

  const submit = (data) => {
    const url = `http://localhost:8080/bookings`;
    const sendObj = {
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      hotelId: Number(hotel?.id),
    };
    createReserver(url, sendObj);
    reset({
      checkIn: "",
      checkOut: "",
    });
    const toasteId = toast.loading("Loading...");
    setTimeout(() => {
      toast.success("Reserva exitosamente realizada", { id: toasteId });
    }, 1000);
  };

  return (
    <section className="reserve__container">
      <h3 className="reserve__title">Do you want to reserve this hotel?</h3>
      <form className="reserve__form" onSubmit={handleSubmit(submit)}>
        <div className="container__fechas">
          <label className="reserve__label">
            <div className="caja__form">
              <span className="reserve__span">Check-in</span>
              <input
                className="reserve__input"
                {...register("checkIn")}
                type="date"
              />
            </div>
            {errors.checkIn?.message && (
              <p className="message__error">{errors.checkIn?.message}</p>
            )}
          </label>
          <label className="reserve__label">
            <div className="caja__form">
              <span className="reserve__span">Check-out</span>
              <input
                className="reserve__input"
                {...register("checkOut")}
                type="date"
              />
            </div>
            {errors.checkOut?.message && (
              <p className="message__error">{errors.checkOut?.message}</p>
            )}
          </label>
        </div>
        <div className="container__date-invalid">
          {errors.checkIn?.message || errors.checkOut?.message
            ? ""
            : errors[""]?.message && (
                <p className="message__error_invalid">{errors[""]?.message}</p>
              )}
        </div>
        <div className="container__btn-reserve">
          <button className="reserve__btn">Submit</button>
        </div>
      </form>
      <Toaster richColors theme="system" />
    </section>
  );
};

export default FormReserve;
