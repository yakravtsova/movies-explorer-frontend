import './WelcomeTitle.css';
import logo from '../../images/logo.svg';

const WelcomeTitle = ({ title }) => {
  return(
    <div className="welcome">
        <img src={logo} alt="Логотип" className="welcome__logo" />
        <h2 className="welcome__title">{title}</h2>
      </div>
  );
}

export default WelcomeTitle;