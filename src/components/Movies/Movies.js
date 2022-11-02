import { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MainContainer from '../MainContainer/MainContainer';
import { likeMovie } from '../../utils/MainApi';

const Movies = ({ numAfterSearch, step, handleSetSavedMovies, savedMovies, handleGetSavedMovies, handleSearchMovies, isLoading, isError, handleSetFoundMovies, foundMovies }) => {
  const request = localStorage.getItem('searchReq');

  useEffect(() => {
    const movies = JSON.parse(localStorage.getItem('foundMovies'));
    if (request) {
      console.log(request);
      handleSetFoundMovies(movies);
      handleGetSavedMovies();
    }
  }, [])


  const handleLikeMovie = (movie) => {
    likeMovie(movie)
      .then(res => {
        handleSetSavedMovies(state => [...state, res]);
        console.log(res)
      })
      .catch(err => console.log(err))
  }

  return(
    <MainContainer>
      <SearchForm handleSearchMovies={handleSearchMovies} req={request} />
      {request && <MoviesCardList
        moviesList={foundMovies}
        isError={isError}
        numAfterSearch={numAfterSearch}
        step={step}
        isLoading={isLoading}
        likeMovie={handleLikeMovie}
        savedMovies={savedMovies} />}
    </MainContainer>
  );
}

export default Movies;