import './AboutProject.css';

const AboutProject = () => {
  return(
    <section className="about">
      <h2 className="about__title">О проекте</h2>
      <div className="about__wrap">
        <div className="about__column">
          <h3 className="about__column-title">Дипломный проект включал 5 этапов</h3>
          <p className="about__paragraph">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="about__column">
          <h3 className="about__column-title">На выполнение диплома ушло 5 недель</h3>
          <p className="about__paragraph">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className="about__wrap">
        <div className="about__back">
          <p className="about__line about__line_end_back">1 неделя</p>
          <p className="about__subtitle">Back-end</p>
        </div>
        <div className="about__front">
          <p className="about__line about__line_end_front">4 недели</p>
          <p className="about__subtitle">Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;