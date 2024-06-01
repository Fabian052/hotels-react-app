import { useForm } from "react-hook-form";
import "./styles/FilterForPrices.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchemaFilterPrice } from "../ValidationsTheForm/userSchema";

const FilterForPrices = ({ setFromTo }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchemaFilterPrice),
  });

  const submit = (data) => {
    const from = data.from;
    const to = data.to;

    setFromTo({
      from: from === "" ? 0 : +from,
      to: to === "" ? Infinity : +to,
    });
  };

  return (
    <section className="price__container">
      <h3 className="price__name">Price</h3>
      <form className="price__from" onSubmit={handleSubmit(submit)}>
        <label className="price__label">
          <span className="price__span">From:</span>
          <input className="price__input" {...register("from")} type="number" />
        </label>
        <label className="price__label">
          <span className="price__span">To:</span>
          <input className="price__input" {...register("to")} type="number" />
        </label>
        <div className="contairne__error-filter">
          {errors.from?.message && (
            <p className="error__filter-price">{errors.from?.message}</p>
          )}
          {errors.to?.message && (
            <p className="error__filter-price">{errors.to?.message}</p>
          )}
          {errors.from?.message || errors.to?.message
            ? ""
            : errors[""]?.message && (
                <p className="error__filter-price">{errors[""]?.message}</p>
              )}
        </div>
        <button className="price__btn">Apply</button>
      </form>
    </section>
  );
};

export default FilterForPrices;
