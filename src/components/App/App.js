import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Header from '../Header/Header';
import './App.css';

function App() {
  const [ isMenuVisible, setIsMenuVisible ] = useState(false);

  const handleMenuOpen = () => {
    setIsMenuVisible(!isMenuVisible);
  }

  return (
    <>
      <Header isMenuVisible={isMenuVisible} handleMenuOpen={handleMenuOpen} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
      </Routes>
    </>
  );
}

export default App;
