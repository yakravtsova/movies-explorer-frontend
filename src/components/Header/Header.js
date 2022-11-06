import './Header.css';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/logo.svg';
import Nav from '../Nav/Nav';

const Header = ({ isMenuVisible, handleMenuOpen, loggedIn }) => {
  const loc = useLocation();
  const isMain = (loc.pathname === '/');

  const onBurgerClick = () => {
    handleMenuOpen(state => !state);
  }

  return(
    <header className={`header ${isMain && 'header_bg_pink'}`}>
      <div className="header__wrap">
        <Link to="/" className="header__link">
          <img className="header__logo" src={logo} alt="Логотип" />
        </Link>
        <Nav loggedIn={loggedIn} isMenuVisible={isMenuVisible} handleMenuOpen={handleMenuOpen} />
        {loggedIn && <button type="button" onClick={onBurgerClick} className={`header__menu-btn ${isMenuVisible && 'header__menu-btn_close'}`}></button>}
      </div>
    </header>
  );
}

export default Header;