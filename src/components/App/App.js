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
import { searchMovies } from '../../utils/MoviesApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import {
  MOVIES_NUM_DESKTOP,
  MOVIES_STEP_BIG_DESKTOP,
  MOVIES_STEP_DESKTOP,
  MOVIES_NUM_TABLET,
  MOVIES_STEP_TABLET,
  MOVIES_NUM_MOBILE,
  MOVIES_STEP_MOBILE,
  SCREEN_BIG_DESKTOP,
  SCREEN_DESKTOP,
  SCREEN_TABLET,
  SCREEN_MOBILE
} from '../../utils/constants/constants';

function App() {
  const [ isMenuVisible, setIsMenuVisible ] = useState(false);
  const [ isOk, setIsOk ] = useState(false);
  const [ isInfoTooltipOpen, setIsInfoTooltipOpen ] = useState(false);
  const [ loggedIn, setLoggedIn ] = useState(false);
  const [ currentUser, setCurrentUser ] = useState({});
  const [ windowWidth, setWindowWidth ] = useState();
  const [ numberOfMoviesAfterSearch, setNumberOfMoviesAfterSearch ] = useState(0);
  const [ step, setStep ] = useState(0);
  const [ isError, setIsError ] = useState(false);
  const [ foundMovies, setFoundMovies ] = useState([]);
  const loc = useLocation();
  const isMovies = loc.pathname === '/movies';
  const isMainPages = (loc.pathname === '/' || isMovies || loc.pathname === '/saved-movies');
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

  useEffect(() => {
    const handleWindowResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      if (isMovies) {
        if (width <= SCREEN_MOBILE) {
          setNumbers(MOVIES_NUM_MOBILE, MOVIES_STEP_MOBILE);
        }
        if (width > SCREEN_MOBILE && width <= SCREEN_TABLET) {
          setNumbers(MOVIES_NUM_TABLET, MOVIES_STEP_TABLET);
        }
        if (width > SCREEN_TABLET && width <= SCREEN_BIG_DESKTOP) {
          setNumbers(MOVIES_NUM_DESKTOP, MOVIES_STEP_DESKTOP);
        }
        if (width > SCREEN_BIG_DESKTOP) {
          setNumbers(MOVIES_NUM_DESKTOP, MOVIES_STEP_BIG_DESKTOP);
        }
        console.log("set")
      }
    }

    handleWindowResize();

    window.addEventListener('resize', () => {
      setTimeout(handleWindowResize, 500)
    });

    return() => window.removeEventListener('resize', () => {
      setTimeout(handleWindowResize, 500)
    });

  }, [windowWidth, loc])



  const setNumbers = (num, step) => {
    setNumberOfMoviesAfterSearch(num);
    setStep(step);
  }

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
      /*  setIsOk(false);
        handleInfoTooltipOpen();*/
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

  const handleFoundMovies = (movies) => {
    setFoundMovies(movies)
  }

  const handleSearchMovies = (req) => {
    /*  let filtered;
      const allMovies = JSON.parse(localStorage.getItem('allMovies'));
      if (allMovies) {
        filtered = allMovies.filter(m => m.nameRU.toLowerCase().includes(req))
        setFoundMovies(filtered);
        localStorage.setItem('foundMovies', JSON.stringify(filtered));
        localStorage.setItem('searchReq', req);
      }
      else {*/
        searchMovies()
        .then(res => {
          const filtered = res.filter(m => m.nameRU.toLowerCase().includes(req));
          setFoundMovies(filtered);
          localStorage.setItem('allMovies', JSON.stringify(res));
          localStorage.setItem('foundMovies', JSON.stringify(filtered));
          localStorage.setItem('searchReq', req);
        })
        .catch(err => {
          console.log(err);
          setIsError(true)
        })
      //}
    }








  return (
    <CurrentUserContext.Provider value={currentUser}>
      {(isMainPages || loc.pathname === '/profile') && <Header isMenuVisible={isMenuVisible} handleMenuOpen={handleMenuOpen} loggedIn={loggedIn} />}
      <Routes>
        <Route end path="/" element={<Main />} />
        <Route path="/movies" element={
          <ProtectedRoute loggedIn={loggedIn}>
            <Movies numAfterSearch={numberOfMoviesAfterSearch} step={step} foundMovies={foundMovies} handleFoundMovies={handleFoundMovies} handleSearchMovies={handleSearchMovies} isError={isError} />
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
