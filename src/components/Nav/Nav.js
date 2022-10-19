import { Link, NavLink } from "react-router-dom";
import './Nav.css';
import AccountLink from "../AccountLink/AccountLink";


const Nav = ({ loggedIn, isMenuVisible, handleMenuOpen }) => {

  const navLinkClassNames = ({isActive}) => isActive ? "nav__menu-link nav__menu-link_active" : "nav__menu-link";
  const navLinkMainClassNames = ({isActive}) => navLinkClassNames({isActive}) + ' nav__menu-link_route_main';

  const handleMenuClose = (evt) => {
    if (evt.target.classList.contains('nav__menu-link') || evt.target.classList.contains('account-link') || evt.target.classList.contains('nav__wrap_visible')) {
      handleMenuOpen();
    }
  }

  return (
    <nav className={`nav__wrap ${loggedIn && 'nav__wrap_state_logged-in'} ${isMenuVisible && 'nav__wrap_visible'}`} onClick={handleMenuClose}>
      <div className={`nav__container ${loggedIn && 'nav__container_state_logged-in'}`}>
        {loggedIn ? (
          <>
            <div className="nav__menu">
              <NavLink end to="/" className={navLinkMainClassNames}>Главная</NavLink>
              <NavLink to="/movies" className={navLinkClassNames}>Фильмы</NavLink>
              <NavLink to="/saved-movies" className={navLinkClassNames}>Сохранённые фильмы</NavLink>
            </div>
            <AccountLink />
          </>
        ) : (
          <>
            <Link to="signup" className="nav__reg-link">Регистрация</Link>
            <Link to="signin" className="nav__auth-link">Войти</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Nav;