import { useContext } from 'react';
import './MoviesCard.css';
import { SERVER_URL } from '../../utils/constants/constants';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const MoviesCard = ({ movie, isMovies, likeMovie, savedMovies }) => {

  const currentUser = useContext(CurrentUserContext);
  const isLiked = isMovies ? savedMovies.some(i => i.movieId === movie.id) : true;
  const url = isMovies ? `${SERVER_URL}${movie.image.url}` : `${movie.image}`;
  const thumbnailUrl = `${SERVER_URL}${movie.image?.formats?.thumbnail?.url}`;
  const name = movie.nameRU;
  const hours = Math.floor(movie.duration/60);
  const minutes = movie.duration % 60;
  const moviesCardButtonClassName = `movies-card__btn ${isMovies ? `movies-card__btn_feat_like ${isLiked && 'movies-card__btn_feat_like-active'}` : "movies-card__btn_feat_delete"}`;

  const handleLikeCard = () => {
    const {id, created_at, updated_at, ...rest} = movie;
    let movieReq = {...rest, image: url, thumbnail: thumbnailUrl, movieId: movie.id};
    likeMovie(movieReq);
  }

  return(
    <li className="movies-card">
      <div className="movies-card__ratio-box">
        <a href={movie.trailerLink} target="_blank" rel="noreferrer">
          <img className="movies-card__img" src={url} alt={name} />
        </a>
      </div>
      <div className="movies-card__info">
        <h2 className="movies-card__title">{name}</h2>
        <button type="button" className={moviesCardButtonClassName} aria-label={isMovies ? "Нравится" : "Удалить"} onClick={handleLikeCard}></button>
      </div>
      <p className="movies-card__duration">{hours ? `${hours}ч ` : ''}{minutes ? `${minutes}м` : ''}</p>
    </li>
  );
}

export default MoviesCard;