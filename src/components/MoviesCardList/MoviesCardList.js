import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';


const MoviesCardList = ({ moviesList, isError, numAfterSearch, step }) => {
  const loc = useLocation();
  const [ isMovies, setIsMovies ] = useState(false);
  const [ numberOfShownMovies, setNumberOfShownMovies ] = useState(0);




  useEffect(() => {
    setIsMovies(loc.pathname === '/movies');
  }, [])

  useEffect(() => {
    console.log(step);
      setNumberOfShownMovies(numAfterSearch);
  }, [moviesList])



  const showMore = () => {
    (numberOfShownMovies + step < moviesList.length) ? setNumberOfShownMovies(numberOfShownMovies + step) : setNumberOfShownMovies(moviesList.length)
  }

  const moviesToShow = () => {
    return moviesList.slice(0, numberOfShownMovies).map((movie, i) => (
      <MoviesCard key={movie.id} movie={movie} isMovies={isMovies} />
    ))
  }

  return(
    <section className="card-list">
      {moviesList.length ?
      <div className="card-list__container">
        <ul className="card-list__list">
          {moviesToShow()

        /*moviesList.map((movie, i) => (
          <MoviesCard key={movie.id} movie={movie} isMovies={isMovies} />
        ))*/}
          </ul>
        {(!moviesList.length || !(moviesList.length <= numberOfShownMovies)) && <button type="button" className="card-list__btn" aria-label="Ещё" onClick={showMore}>Ещё</button>}
      </div> : <p>{!isError ? 'Ничего не найдено' : 'Ошибка'}</p>}
    </section>
  );
}

export default MoviesCardList;