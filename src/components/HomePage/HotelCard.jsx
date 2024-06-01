
import { useNavigate } from 'react-router-dom'
import './styles/HotelCard.css'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

const HotelCard = ({ hotel }) => {

  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/hotels/${hotel.id}`)
  }

  return (
    <div className='card__container'>
      <header className='card__header'>
        <img className='card__img' src={hotel.images[0].url} alt="" />
      </header>
      <section className='card__section'>
        <h3 className='card__name'>{hotel.name}</h3>
        <p className='card__rating'>
          {
            [... new Array(5)].map((star, index) => (
              index < Math.floor(hotel?.rating) ? <AiFillStar key={index} /> : <AiOutlineStar key={index} />
            ))
          }
          <span className='number__rating'>{hotel.rating}</span>
        </p>
        <span className='card__city'> {hotel.city.name}, {hotel.city.country}</span>
        <div className='card__price'>$ {hotel.price}</div>
      </section>
      <footer className='card__footer'>
        <button className='card__btn' onClick={handleClick}>See more...</button>
      </footer>
    </div>
  )
}

export default HotelCard