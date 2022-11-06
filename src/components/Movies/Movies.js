import { useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MainContainer from '../MainContainer/MainContainer';

const Movies = ({
  numAfterSearch,
  step,
  handleLikeMovie,
  savedMovies,
  handleSearchMovies,
  isLoading,
  isError,
  handleSetFoundMovies,
  foundMovies,
  handleDeleteMovie,
  removeError,
  handleShortFilmCheck,
  shortFilmsFilter }) => {
  const request = localStorage.getItem('searchReq');
  const shortFilmCheck = localStorage.getItem('shortFilmCheck') === "true" ? true : false;
  const movies = JSON.parse(localStorage.getItem('foundMovies'));

  useEffect(() => {
    removeError();
    if (request) {
      let result = movies;
      if (shortFilmCheck) {
        result = movies.filter(m => m.duration < 41);
      }
      handleSetFoundMovies(result);
    }
  }, [])



  return(
    <MainContainer>
      <SearchForm
        handleSearchMovies={handleSearchMovies}
        req={request} shortFilmCheck={shortFilmCheck}
        handleShortFilmCheck={handleShortFilmCheck}
        shortFilmsFilter={shortFilmsFilter} />
      {request && <MoviesCardList
        moviesList={foundMovies}
        isError={isError}
        numAfterSearch={numAfterSearch}
        step={step}
        isLoading={isLoading}
        likeMovie={handleLikeMovie}
        savedMovies={savedMovies}
        handleDeleteMovie={handleDeleteMovie} />}
    </MainContainer>
  );
}

export default Movies;