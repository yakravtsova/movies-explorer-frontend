import { useState, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Header from '../Header/Header';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import './App.css';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Footer from '../Footer/Footer';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import ProtectedRoute from '../ProtectedRoute';
import { register, authorize, getUserData, editUserData } from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {
  const [ isMenuVisible, setIsMenuVisible ] = useState(false);
  const [ isOk, setIsOk ] = useState(false);
  const [ isInfoTooltipOpen, setIsInfoTooltipOpen ] = useState(false);
  const [ loggedIn, setLoggedIn ] = useState(false);
  const [ currentUser, setCurrentUser ] = useState({});
  const loc = useLocation();
  const isMainPages = (loc.pathname === '/' || loc.pathname === '/movies' || loc.pathname === '/saved-movies');
  const navigate = useNavigate();
  document.documentElement.lang = 'ru';

  useEffect(() => {
    tokenCheck();
  }, []);

 useEffect(() => {
    if (loggedIn) {
    /*  api.getAllData()
      .then(allData => {
        const [userData, allCardsData] = allData;
        console.log(userData);
        setCards(allCardsData);
        setCurrentUser(userData)
      })
      .catch(err => console.log(err));*/
      getUserData()
      .then(data => {
        setCurrentUser(data);
      })
      .catch(err => console.log(err))
    }
  }, [loggedIn]);

  const tokenCheck = () => {
    const location = loc.pathname;
    console.log(location);
  //  setLocation(loc.pathname);
    const token = localStorage.getItem('token');
    if (token) {
      getUserData()
      .then(data => {
        if (data) {
          setCurrentUser(data);
          handleLogin();
          navigate(location, { replace: true });
        }
      })
      .catch(err => {
        console.log(err);
        setIsOk(false);
        handleInfoTooltipOpen();
      });
    }
  }

  const handleLogin = () => {
    setLoggedIn(true);
  }

  const handleMenuOpen = () => {
    setIsMenuVisible(!isMenuVisible);
  }

  const handleInfoTooltipOpen = () => {
    setIsInfoTooltipOpen(!isInfoTooltipOpen);
  }

  //регистрация
  const handleRegister = (regData) => {
    register(regData)
      .then(res => {
        if (res) {
          setIsOk(true);
          handleInfoTooltipOpen();
        }
        else {
          setIsOk(false);
          handleInfoTooltipOpen();
        }
        })
      .catch(err => {
        setIsOk(false);
        handleInfoTooltipOpen();
      })
  }

  //авторизация
  const handleAuthorization = (loginData) => {
    authorize(loginData)
    .then(data => {
      if (data.token) {
        handleLogin();
      //  tokenCheck();
        navigate('/movies', { replace: true });
      /*  api.getAllData()
          .then(allData => {
            const [userData, allCardsData] = allData;
            console.log(userData);
            setCards(allCardsData);
            setCurrentUser(userData)
          })
          .catch(err => console.log(err));

      }
      else {
        setIsOk(false);
        handleTooltipOpen()
      }*/
    }})
    .catch(err => {
      setIsOk(false);
      handleInfoTooltipOpen();
      console.log(err);
    })
  }

  //выход из аккаунта
  const handleLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('allMovies');
    localStorage.removeItem('foundMovies');
    localStorage.removeItem('searchReq');
    setLoggedIn(false);
    navigate('/', { replace: true });
  }

  //редактирование информации о пользователе
  const handleEditUserData = (userData) => {
    editUserData(userData)
    .then(data => {
      setCurrentUser(data);
    })
    .catch(err => {
      console.log(err);
      setIsOk(false);
      handleInfoTooltipOpen();
    });
  }






  return (
    <CurrentUserContext.Provider value={currentUser}>
      {(isMainPages || loc.pathname === '/profile') && <Header isMenuVisible={isMenuVisible} handleMenuOpen={handleMenuOpen} loggedIn={loggedIn} />}
      <Routes>
        <Route end path="/" element={<Main />} />
        <Route path="/movies" element={
          <ProtectedRoute loggedIn={loggedIn}>
            <Movies />
          </ProtectedRoute>} />
        <Route path="/saved-movies" element={
          <ProtectedRoute loggedIn={loggedIn}>
            <SavedMovies />
          </ProtectedRoute>} />
        <Route path="/profile" element={
          <ProtectedRoute loggedIn={loggedIn}>
            <Profile handleEditUserData={handleEditUserData} handleLogOut={handleLogOut} />
          </ProtectedRoute>} />
        <Route path="/signin" element={<Login handleAuthorization={handleAuthorization} />} />
        <Route path="/signup" element={<Register handleRegister={handleRegister} />} />
        <Route path="*" element={
          <ProtectedRoute loggedIn={loggedIn}>
            <NotFoundPage />
          </ProtectedRoute>} />
      </Routes>
      {isMainPages && <Footer />}
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        isSuccess={isOk}
        successMessage="Вы успешно зарегистрировались!"
        errorMessage="Что-то пошло не так! Попробуйте ещё раз."
        onClose={handleInfoTooltipOpen} />
    </CurrentUserContext.Provider>
  );
}

export default App;
