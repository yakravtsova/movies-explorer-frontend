import './Portfolio.css';

const Portfolio = () => {
  return(
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <a className="portfolio__link" href="https://yakravtsova.github.io/how-to-learn/" target="_blank" rel="noreferrer">
            <div className="portfolio__site-item">
              <p className="portfolio__site-text">Статичный сайт</p>
              <p className="portfolio__site-text">↗</p>
            </div>
          </a>
        </li>
        <li className="portfolio__list-item">
          <a className="portfolio__link" href="https://yakravtsova.github.io/russian-travel-by-yakravtsova/index.html" target="_blank" rel="noreferrer">
            <div className="portfolio__site-item">
              <p className="portfolio__site-text">Адаптивный сайт</p>
              <p className="portfolio__site-text">↗</p>
            </div>
          </a>
        </li>
        <li className="portfolio__list-item">
          <a className="portfolio__link" href="https://yakrvtsva-mesto.students.nomoredomains.sbs/" target="_blank" rel="noreferrer">
            <div className="portfolio__site-item">
              <p className="portfolio__site-text">Одностраничное приложение</p>
              <p className="portfolio__site-text">↗</p>
            </div>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;