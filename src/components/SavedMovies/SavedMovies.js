import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';
import MainContainer from '../MainContainer/MainContainer';
import { useEffect } from 'react';

const SavedMovies = ({
  isError,
  isLoading,
  movies,
  savedMovies,
  handleDeleteMovie,
  handleFilterSavedMovies,
  handleSetShownSavedMovies,
  removeError,
  errorMessage,
  handleShortFilmCheck,
  shortSavedFilmsFilter }) => {
  useEffect(() => {
    handleSetShownSavedMovies(savedMovies);
    removeError();
  }, [])

  return(
    <MainContainer>
      <SearchForm
        handleSearchMovies={handleFilterSavedMovies}
        isError={isError}
        errorMessage={errorMessage}
        handleShortFilmCheck={handleShortFilmCheck}
        shortSavedFilmsFilter={shortSavedFilmsFilter} />
      <MoviesCardList  moviesList={movies} isError={isError} isLoading={isLoading} handleDeleteMovie={handleDeleteMovie} />
    </MainContainer>
  );
}

export default SavedMovies;