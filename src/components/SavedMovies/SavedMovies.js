import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';
import MoviesPage from '../MainContainer/MainContainer';

const SavedMovies = () => {
  return(
    <MoviesPage>
      <SearchForm />
      <MoviesCardList />
    </MoviesPage>
  );
}

export default SavedMovies;