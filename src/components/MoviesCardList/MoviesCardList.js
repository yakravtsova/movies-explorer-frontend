import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Preloader from '../Preloader/Preloader';


const MoviesCardList = ({ moviesList, isError, numAfterSearch, step, isLoading, likeMovie, savedMovies }) => {
  const loc = useLocation();
  const [ isMovies, setIsMovies ] = useState(false);
  const [ numberOfShownMovies, setNumberOfShownMovies ] = useState(0);




  useEffect(() => {
    setIsMovies(loc.pathname === '/movies');
  }, [])

  useEffect(() => {
    setNumberOfShownMovies(numAfterSearch);
  }, [moviesList])



  const showMore = () => {
    (numberOfShownMovies + step < moviesList.length) ? setNumberOfShownMovies(numberOfShownMovies + step) : setNumberOfShownMovies(moviesList.length)
  }

  const moviesToShow = () => {
    if (isMovies) {
      return moviesList.slice(0, numberOfShownMovies).map((movie, i) => (
        <MoviesCard key={movie.id} movie={movie} isMovies={isMovies} likeMovie={likeMovie} savedMovies={savedMovies} />
      ))
    }
    else return moviesList.map((movie, i) => (
      <MoviesCard key={movie.movieId} movie={movie} isMovies={isMovies} />
    ))
  }

  return(
    <section className="card-list">
      {isLoading ? <Preloader /> : moviesList.length ?
      <div className="card-list__container">
        <ul className="card-list__list">
          {moviesToShow()}
          </ul>
        {(!moviesList.length || !(moviesList.length <= numberOfShownMovies)) && isMovies && <button type="button" className="card-list__btn" aria-label="Ещё" onClick={showMore}>Ещё</button>}
      </div> :
      <p className={`card-list__paragraph ${isError && 'card-list__paragraph_error'}`}>{!isError ?
            'Ничего не найдено' :
            'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.'}
      </p>}
    </section>
  );
}

export default MoviesCardList;