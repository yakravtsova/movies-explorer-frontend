import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';
import MainContainer from '../MainContainer/MainContainer';
import { useEffect } from 'react';

const SavedMovies = ({ handleGetSavedMovies, isError, isLoading, savedMovies }) => {


  useEffect(() => {
    handleGetSavedMovies();
  }, [])



  return(
    <MainContainer>
      <SearchForm />
      <MoviesCardList  moviesList={savedMovies} isError={isError} isLoading={isLoading} />
    </MainContainer>
  );
}

export default SavedMovies;