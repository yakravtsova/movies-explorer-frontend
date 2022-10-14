import './Techs.css';

const Techs = () => {
  return(
    <section className="techs">
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
              <a href="#" className="techs__link">HTML</a>
            </li>
            <li className="techs__item">
              <a href="#" className="techs__link">CSS</a>
            </li>
            <li className="techs__item">
              <a href="#" className="techs__link">JS</a>
            </li>
            <li className="techs__item">
              <a href="#" className="techs__link">React</a>
            </li>
            <li className="techs__item">
              <a href="#" className="techs__link">Git</a>
            </li>
            <li className="techs__item">
              <a href="#" className="techs__link">Express.js</a>
            </li>
            <li className="techs__item">
              <a href="#" className="techs__link">mongoDB</a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Techs;