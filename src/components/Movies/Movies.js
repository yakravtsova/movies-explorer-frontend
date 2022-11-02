import { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MainContainer from '../MainContainer/MainContainer';

const Movies = ({ numAfterSearch, step, foundMovies, handleFoundMovies, handleSearchMovies, isError }) => {
  const request = localStorage.getItem('searchReq');

  useEffect(() => {
    const movies = JSON.parse(localStorage.getItem('foundMovies'));
    if (request) {
      console.log(request);
      handleFoundMovies(movies);
    }

  }, [])



  return(
    <MainContainer>
      <SearchForm handleSearchMovies={handleSearchMovies} req={request} />
      {request && <MoviesCardList moviesList={foundMovies} isError={isError} numAfterSearch={numAfterSearch} step={step} />}
    </MainContainer>
  );
}

export default Movies;