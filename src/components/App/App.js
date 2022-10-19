import { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Header from '../Header/Header';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import './App.css';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

function App() {
  const [ isMenuVisible, setIsMenuVisible ] = useState(false);
  const loc = useLocation();
  const isRegOrLog = (loc.pathname === '/' || loc.pathname === '/movies' || loc.pathname === '/saved-movies' || loc.pathname === '/profile');

  const handleMenuOpen = () => {
    setIsMenuVisible(!isMenuVisible);
  }

  return (
    <>
      {isRegOrLog && <Header isMenuVisible={isMenuVisible} handleMenuOpen={handleMenuOpen} />}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
