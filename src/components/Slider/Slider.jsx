import { useEffect, useRef } from "react";
import "./styles/Slider.css";
import { Link } from "react-router-dom";

const Slider = ({ hotel }) => {
  const slideShow = useRef(null);
  const intervalRef = useRef(null);

  const handlePrevImg = () => {
    if (slideShow.current?.children.length > 0) {
      const lastIndex = slideShow.current.children.length - 1;
      const lastElement = slideShow.current.children[lastIndex];

      slideShow.current.insertBefore(lastElement, slideShow.current.firstChild);

      slideShow.current.style.transition = `none`;

      const sizaSlide = slideShow.current.children[0].offsetWidth;
      slideShow.current.style.transform = `translateX(-${sizaSlide}px)`;

      setTimeout(() => {
        slideShow.current.style.transition = `1000ms ease-out all`;
        slideShow.current.style.transform = `translateX(0)`;
      }, 30);
    }
  };

  const handleNextImg = () => {
    if (slideShow.current?.children.length > 0) {
      const firstElement = slideShow.current.children[0];

      // establecemos la transicion para el slideShow
      slideShow.current.style.transition = `1000ms ease-out all`;

      // obtener el tamaño del movimiento del slide
      const sizaSlide = slideShow.current.children[0].offsetWidth;

      // movemos el slideShow
      slideShow.current.style.transform = `translateX(-${sizaSlide}px)`;

      const transition = () => {
        slideShow.current.style.transition = `none`;
        slideShow.current.style.transform = `translateX(0)`;

        // ubico el priemr elemento al final
        slideShow.current.appendChild(firstElement);

        slideShow.current.removeEventListener("transitionend", transition);
      };

      slideShow.current.addEventListener("transitionend", transition);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextImg();
    }, 5000);

    // para el recorrido si el mouse esta ensima
    slideShow.current.addEventListener("mouseenter", () => {
      clearInterval(interval);
      clearInterval(intervalRef.current);
    });

    // continua el recorrido si el mouse se quita
    slideShow.current.addEventListener("mouseleave", () => {
      intervalRef.current = setInterval(() => {
        handleNextImg();
      }, 4000);
    });
  }, []);

  return (
    <div className="cont__total-slide">
      <div ref={slideShow} className="cont__slideShow">
        {hotel?.images.map((itemImg) => (
          <div key={itemImg.id} className="slide">
            <Link>
              <img className="imgs" src={itemImg.url} />
            </Link>
          </div>
        ))}
      </div>
      <div className="controles__slice">
        <button className="btn-left control-btn">
          <i onClick={handlePrevImg} className="bx bxs-chevron-left punto"></i>
        </button>
        <button className="btn-right control-btn">
          <i onClick={handleNextImg} className="bx bxs-chevron-right punto"></i>
        </button>
      </div>
    </div>
  );
};

export default Slider;
