import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

const Movies = () => {
  return(
    <>
      <SearchForm />
      <MoviesCardList />
      <Footer />
    </>
  );
}

export default Movies;