import './Footer.css';

const Footer = () => {
  return(
    <footer className="footer">
      <h3 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
      <div className="footer__wrap">
        <p className="footer__paragraph">© 2020</p>
        <nav>
          <ul className="footer__menu">
            <li className="footer__menu-item">
              <a href="#" className="footer__link">Яндекс.Практикум</a>
            </li>
            <li className="footer__menu-item">
              <a href="#" className="footer__link">Github</a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;