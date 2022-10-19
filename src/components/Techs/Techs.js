import './Techs.css';

const Techs = () => {
  return(
    <section className="techs" id="techs">
      <div className="techs__container">
        <h2 className="techs__title">Технологии</h2>
        <div className="techs__wrap">
          <h3 className="techs__wrap-title">
            7 технологий
          </h3>
          <p className="techs__paragraph">
            На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
          </p>
          <ul className="techs__list">
            <li className="techs__item">
              <a href="https://html5.org/" className="techs__link">HTML</a>
            </li>
            <li className="techs__item">
              <a href="https://www.w3.org/Style/CSS/Overview.en.html" className="techs__link">CSS</a>
            </li>
            <li className="techs__item">
              <a href="https://www.javascript.com/" className="techs__link">JS</a>
            </li>
            <li className="techs__item">
              <a href="https://ru.reactjs.org/" className="techs__link">React</a>
            </li>
            <li className="techs__item">
              <a href="https://github.com/" className="techs__link">Git</a>
            </li>
            <li className="techs__item">
              <a href="https://expressjs.com/ru/" className="techs__link">Express.js</a>
            </li>
            <li className="techs__item">
              <a href="https://www.mongodb.com/" className="techs__link">mongoDB</a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Techs;