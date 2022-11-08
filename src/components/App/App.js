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
import ProtectedRoute from '../ProtectedRoute';
import ForbiddenRoute from '../ForbiddenRoute';
import { register, authorize, getUserData, editUserData, getSavedMovies, deleteMovie, likeMovie } from '../../utils/MainApi';
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
  SCREEN_TABLET,
  SCREEN_MOBILE,
  PROFILE_UPDATE_MESSAGE,
  FULL_LENGTH_DURATION
} from '../../utils/constants/constants';
import { USER_DATA_ERROR, TOKEN_ERROR, TOKEN_INVALID, SERVER_ERROR, CONFLICT_ERROR, REG_ERROR, PROFILE_UPDATE_ERROR } from '../../utils/constants/errorMessages';

function App() {
  const [ isMenuVisible, setIsMenuVisible ] = useState(false);
  const [ loggedIn, setLoggedIn ] = useState(false);
  const [ currentUser, setCurrentUser ] = useState({});
  const [ windowWidth, setWindowWidth ] = useState();
  const [ numberOfMoviesAfterSearch, setNumberOfMoviesAfterSearch ] = useState(0);
  const [ step, setStep ] = useState(0);
  const [ savedMovies, setSavedMovies ] = useState([]);
  const [ shownSavedMovies, setShownSavedMovies ] = useState([]);
  const [ filteredSavedMovies, setFilteredSavedMovies ] = useState([]);
  const [ foundMovies, setFoundMovies ] = useState([]);
  const [ isError, setIsError ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ isProfileUpdated, setIsProfileUpdated ] = useState('');
  const [ errorMessage, setErrorMessage ] = useState('');
  const [ shortFilmCheck, setShortFilmCheck ] = useState(false);
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
      getUserData()
      .then(data => {
        setCurrentUser(data);
      })
      .catch(err => console.log(err))
      handleGetSavedMovies();
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
        if (err) {
          handleLogOut();
        }
      });
    }
  }

  const handleLogin = () => {
    setLoggedIn(true);
  }

  const handleMenuOpen = (bool) => {
    setIsMenuVisible(bool);
  }

  //регистрация
  const handleRegister = (regData) => {
    register(regData)
      .then(res => {
        if (res) {
          setIsError(false);
          const {name, ...loginData} = regData;
          handleAuthorization(loginData);
        }
        else {
          setIsError(true);
          setErrorMessage(REG_ERROR)
        }
      })
      .catch(err => {
        setIsError(true);
        console.log(err);
        if (err === 409) {
          setErrorMessage(CONFLICT_ERROR);
        }
        if (err === 500) {
          setErrorMessage(SERVER_ERROR);
        }
      })
  }

  //авторизация
  const handleAuthorization = (loginData) => {
    authorize(loginData)
    .then(data => {
      if (data.token) {
        setIsError(false);
        handleLogin();
       // tokenCheck();
        getUserData()
          .then(data => {
            if (data) {
              setCurrentUser(data);
              navigate('/movies', { replace: true });
            }
          })
          .catch(err => {
            if (err === 401) {
              setIsError(true);
              setErrorMessage(TOKEN_INVALID)
            }
          });
      }
      else {
        setIsError(true);
        setErrorMessage(TOKEN_ERROR);
      }
    })
    .catch(err => {
      setIsError(true);
      if (err === 401) {
        setErrorMessage(USER_DATA_ERROR)
      }
      else {
        setErrorMessage(SERVER_ERROR)
      }
    })
  }

  //выход из аккаунта
  const handleLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('shortFilmCheck');
    localStorage.removeItem('foundMovies');
    localStorage.removeItem('searchReq');
    setLoggedIn(false);
    setSavedMovies([]);
    navigate('/', { replace: true });
  }

  //редактирование информации о пользователе
  const handleEditUserData = (userData) => {
    editUserData(userData)
    .then(data => {
      setIsError(false);
      setCurrentUser(data);
      setIsProfileUpdated(PROFILE_UPDATE_MESSAGE);
    })
    .catch(err => {
      console.log(err);
      setIsError(true);
      setIsProfileUpdated('');
      if (err === 409) {
        setErrorMessage(CONFLICT_ERROR)
      }
      else {
        setErrorMessage(PROFILE_UPDATE_ERROR)
      }
    });
  }

  //поиск фильмов по строке и длительности
  const searchMoviesAllTheWay = (arr, req) => {
    let filtered = arr.filter(m => m.nameRU.toLowerCase().includes(req));
    localStorage.setItem('foundMovies', JSON.stringify(filtered));
    if (shortFilmCheck) {
      filtered = filtered.filter(m => m.duration < FULL_LENGTH_DURATION);
    }
    setFoundMovies(filtered);
    localStorage.setItem('searchReq', req);
    localStorage.setItem('shortFilmCheck', shortFilmCheck);
  }

  //найти фильмы
  const handleSearchMovies = (req) => {
    setIsError(false);
    setIsLoading(true);
    const allMovies = JSON.parse(localStorage.getItem('allMovies'));
    if (allMovies) {
      searchMoviesAllTheWay(allMovies, req);
      setIsLoading(false);
    }
    else {
      searchMovies()
      .then(res => {
        localStorage.setItem('allMovies', JSON.stringify(res));
        searchMoviesAllTheWay(res, req);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsError(true);
        setIsLoading(false);
      })
    }

  }

  const shortFilmsFilter = (bool) => {
    let filtered;
    localStorage.setItem('shortFilmCheck', shortFilmCheck);
    if (bool) {
      filtered = foundMovies.filter(m => m.duration < FULL_LENGTH_DURATION);
    }
    else {
      filtered = JSON.parse(localStorage.getItem('foundMovies'));
    }
    setFoundMovies(filtered);
  }

  const shortSavedFilmsFilter = (bool) => {
    let filtered;
    setFilteredSavedMovies(shownSavedMovies);
    if (bool) {
      filtered = shownSavedMovies.filter(m => m.duration < FULL_LENGTH_DURATION);
    }
    else {
      filtered = filteredSavedMovies;
    }
    setShownSavedMovies(filtered);
  }

  const handleSetFoundMovies = (movies) => {
    setFoundMovies(movies)
  }

  const handleSetSavedMovies = (movies) => {
    setSavedMovies(movies)
  }

  const handleSetShownSavedMovies = (movies) => {
    setShownSavedMovies(movies);
  }

  //получить сохранённые фильмы
  const handleGetSavedMovies = () => {
    setIsError(false);
    getSavedMovies()
      .then(res => {
        setSavedMovies(res);
        setShownSavedMovies(res);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsError(true);
        setIsLoading(false);
      })
  }

  //отфильтровать сохранённые
  const handleFilterSavedMovies = (req, bool) => {
    setIsError(false);
    let filtered = savedMovies.filter(m => m.nameRU.toLowerCase().includes(req))
    setFilteredSavedMovies(filtered);
    if (shortFilmCheck) {
      filtered = filtered.filter(m => m.duration < FULL_LENGTH_DURATION);
    }
    setShownSavedMovies(filtered);
  }

  //сохранить фильм
  const handleLikeMovie = (movie) => {
    likeMovie(movie)
      .then(res => {
        const movies = [...savedMovies, res]
        setSavedMovies(movies);
        setShownSavedMovies(movies);
      })
      .catch(err => console.log(err))
  }

  //удалить фильм из сохранённых
  const handleDeleteMovie = (movieId) => {
    deleteMovie(movieId)
      .then(res => {
        setSavedMovies(state => state.filter(m => m._id !== movieId));
        setShownSavedMovies(state => state.filter(m => m._id !== movieId));
      })
      .catch(err => console.log(err))
  }

  const removeError = () => {
    setIsError(false);
    setErrorMessage('');
  }

  const handleShortFilmCheck = (value) => {
    setShortFilmCheck(value);
  }

  const handleSetIsProfileUpdated = (value) => {
    setIsProfileUpdated(value)
  }





  return (
    <CurrentUserContext.Provider value={currentUser}>
      {(isMainPages || loc.pathname === '/profile') && <Header isMenuVisible={isMenuVisible} handleMenuOpen={handleMenuOpen} loggedIn={loggedIn} />}
      <Routes>
        <Route end path="/" element={<Main />} />
        <Route path="/movies" element={
          <ProtectedRoute loggedIn={loggedIn}>
            <Movies
              numAfterSearch={numberOfMoviesAfterSearch}
              step={step}
              savedMovies={savedMovies}
              handleGetSavedMovies={handleGetSavedMovies}
              handleSearchMovies={handleSearchMovies}
              isLoading={isLoading}
              isError={isError}
              handleSetFoundMovies={handleSetFoundMovies}
              foundMovies={foundMovies}
              handleLikeMovie={handleLikeMovie}
              handleDeleteMovie={handleDeleteMovie}
              removeError={removeError}
              errorMessage={errorMessage}
              handleShortFilmCheck={handleShortFilmCheck}
              shortFilmsFilter={shortFilmsFilter} />
          </ProtectedRoute>} />
        <Route path="/saved-movies" element={
          <ProtectedRoute loggedIn={loggedIn}>
            <SavedMovies
              movies={shownSavedMovies}
              savedMovies={savedMovies}
              handleSetSavedMovies={handleSetSavedMovies}
              handleSetShownSavedMovies={handleSetShownSavedMovies}
              handleGetSavedMovies={handleGetSavedMovies}
              handleDeleteMovie={handleDeleteMovie}
              isError={isError}
              isLoading={isLoading}
              removeError={removeError}
              errorMessage={errorMessage}
              handleFilterSavedMovies={handleFilterSavedMovies}
              handleShortFilmCheck={handleShortFilmCheck}
              shortSavedFilmsFilter={shortSavedFilmsFilter} />
          </ProtectedRoute>} />
        <Route path="/profile" element={
          <ProtectedRoute loggedIn={loggedIn}>
            <Profile
              handleEditUserData={handleEditUserData}
              handleLogOut={handleLogOut}
              isError={isError}
              errorMessage={errorMessage}
              removeError={removeError}
              handleSetIsProfileUpdated={handleSetIsProfileUpdated}
              isProfileUpdated={isProfileUpdated}/>
          </ProtectedRoute>} />
        <Route path="/signin" element={
          <ForbiddenRoute loggedIn={loggedIn}>
            <Login handleAuthorization={handleAuthorization} isError={isError} errorMessage={errorMessage} removeError={removeError} />
          </ForbiddenRoute>} />
        <Route path="/signup" element={
          <ForbiddenRoute loggedIn={loggedIn}>
            <Register handleRegister={handleRegister} isError={isError} errorMessage={errorMessage} removeError={removeError} />
          </ForbiddenRoute>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {isMainPages && <Footer />}
    </CurrentUserContext.Provider>
  );
}

export default App;
