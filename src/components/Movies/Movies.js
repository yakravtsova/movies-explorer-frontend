import { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { searchMovies } from '../../utils/MoviesApi';

const Movies = () => {
  const [ foundMovies, setFoundMovies ] = useState([]);
  const request = localStorage.getItem('searchReq');

  useEffect(() => {
    const movies = JSON.parse(localStorage.getItem('foundMovies'));
    if (request) {
      console.log(request);
      setFoundMovies(movies);
    }

  }, [])

  const handleSearchMovies = (req) => {
    let filtered;
    const allMovies = JSON.parse(localStorage.getItem('allMovies'));
    if (allMovies) {
      filtered = allMovies.filter(m => m.nameRU.toLowerCase().includes(req))
      setFoundMovies(filtered);
      localStorage.setItem('foundMovies', JSON.stringify(filtered));
      localStorage.setItem('searchReq', req);
    }
    else {
      searchMovies()
      .then(res => {
        const filtered = res.filter(m => m.nameRU.toLowerCase().includes(req));
        setFoundMovies(filtered);
        localStorage.setItem('allMovies', JSON.stringify(res));
        localStorage.setItem('foundMovies', JSON.stringify(filtered));
        localStorage.setItem('searchReq', req);
      })
      .catch(err => console.log(err))
    }

  }
  return(
    <main>
      <SearchForm handleSearchMovies={handleSearchMovies} req={request} />
      <MoviesCardList moviesList={foundMovies} />
    </main>
  );
}

export default Movies;