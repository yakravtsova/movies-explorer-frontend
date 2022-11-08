import './WelcomeTitle.css';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

const WelcomeTitle = ({ title }) => {
  return(
    <div className="welcome">
      <Link to="/" className="header__link">
        <img className="header__logo" src={logo} alt="Логотип" />
      </Link>
      <h2 className="welcome__title">{title}</h2>
    </div>
  );
}

export default WelcomeTitle;