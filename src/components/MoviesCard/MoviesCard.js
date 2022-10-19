import { useState } from 'react';
import './MoviesCard.css';

const MoviesCard = ({ url, name, duration, isMovies }) => {
  const [ isLiked, setIsLiked ] = useState(false);
  const hours = Math.floor(duration/60);
  const minutes = duration % 60;
  const moviesCardButtonClassName = `movies-card__btn ${isMovies ? `movies-card__btn_feat_like ${isLiked && 'movies-card__btn_feat_like-active'}` : "movies-card__btn_feat_delete"}`;

  const handleLikeCard = () => {
    setIsLiked(!isLiked);
  }

  return(
    <li className="movies-card">
      <div className="movies-card__ratio-box">
        <img className="movies-card__img" src={url} alt={name} />
      </div>
      <div className="movies-card__info">
        <h2 className="movies-card__title">{name}</h2>
        <button className={moviesCardButtonClassName} aria-label={isMovies ? "Нравится" : "Удалить"} onClick={handleLikeCard}></button>
      </div>
      <p className="movies-card__duration">{hours ? `${hours}ч ` : ''}{minutes ? `${minutes}м` : ''}</p>
    </li>
  );
}

export default MoviesCard;