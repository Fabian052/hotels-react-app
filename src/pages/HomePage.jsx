import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import HotelCard from "../components/HomePage/HotelCard";
import "./styles/HomePage.css";
import UserLoginAndLogaut from "../components/LoginPage/UserLoginAndLogaut";
import NavarLogin from "../components/LoginPage/NavarLogin";
import FilteresBar from "../components/filtros/FilteresBar";
import { Toaster, toast } from "sonner";

const HomePage = () => {
  const [filterName, setFilterName] = useState("");
  const [fromTo, setFromTo] = useState({
    from: 0,
    to: Infinity,
  });

  // const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  // const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));
  // useEffect(() => {
  //   if (user) toast.success(`Bienvenido ${user.firstName} ${user.lastName}`);
  // }, []);

  const hotels = useSelector((state) => state.hotels);

  const cbfilter = (hotelInfo) => {
    const filtNames = hotelInfo.name
      .toLowerCase()
      .includes(filterName.toLowerCase().trim());

    const price = Number(hotelInfo.price);
    const filterPrice = price >= fromTo.from && price <= fromTo.to;
    return filtNames && filterPrice;
  };

  return (
    <div className="hotel__container-total">
      {localStorage.getItem("token") ? <UserLoginAndLogaut /> : <NavarLogin />}
      <div className="hotel__title">
        <h1 className="title">Hotels for reservations</h1>
      </div>
      <div>
        <FilteresBar
          setFilterName={setFilterName}
          filterName={filterName}
          setFromTo={setFromTo}
        />
      </div>
      <div className="hotel__container">
        {hotels?.filter(cbfilter).map((hotelinfo) => (
          <div key={hotelinfo.id} className="hotel__cards">
            <HotelCard hotel={hotelinfo} />
          </div>
        ))}
      </div>
      {/* <Toaster richColors theme="system" /> */}
    </div>
  );
};

export default HomePage;
