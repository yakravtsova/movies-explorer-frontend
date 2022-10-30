import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const MoviesCardList = ({ moviesList }) => {
  const loc = useLocation();
  const [ isMovies, setIsMovies ] = useState(false);

  useEffect(() => {
    setIsMovies(loc.pathname === '/movies');
  }, [])

  return(
    <section className="card-list">
      <ul className="card-list__list">
        {moviesList.map((movie, i) => (
          <MoviesCard key={movie.id} movie={movie} isMovies={isMovies} />
        ))}
      </ul>
      <button type="button" className="card-list__btn" aria-label="Ещё">Ещё</button>
    </section>
  );
}

export default MoviesCardList;