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
              <a href="https://practicum.yandex.ru/" className="footer__link" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
            </li>
            <li className="footer__menu-item">
              <a href="https://github.com/yakravtsova" className="footer__link" target="_blank" rel="noreferrer">Github</a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;