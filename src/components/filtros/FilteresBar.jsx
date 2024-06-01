import { useRef } from "react";
import "./styles/FilteresBar.css";
import FilterForPrices from "./FilterForPrices";
import CategoryFilter from "./CategoryFilter";

const FilteresBar = ({ setFilterName, filterName, setFromTo }) => {
  const inputValue = useRef();

  const handleChange = () => {
    setFilterName(inputValue.current.value);
  };

  return (
    <div className="filters__container">
      <div className="filters__sub-container">
        <h2 className="filters__title">Filtros:</h2>
        <div className="filters__cont-input">
          <input
            className="filters__input"
            ref={inputValue}
            onChange={handleChange}
            value={filterName}
            type="text"
          />
        </div>
      </div>
      <div className="other__category">
        <div className="other__cities">
          <CategoryFilter />
        </div>
        <div className="other__prices">
          <FilterForPrices setFromTo={setFromTo} />
        </div>
      </div>
    </div>
  );
};

export default FilteresBar;
