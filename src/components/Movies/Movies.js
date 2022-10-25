import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const Movies = () => {
  return(
    <main>
      <SearchForm />
      <MoviesCardList />
    </main>
  );
}

export default Movies;