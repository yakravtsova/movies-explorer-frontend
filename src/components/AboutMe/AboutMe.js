import './AboutMe.css';
import photo from '../../images/student.jpg';

const AboutMe = () => {
  return(
    <section className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__wrap">
        <div>
          <h3 className="about-me__name">Маргарита</h3>
          <p className="about-me__subtitle">Фронтенд-разработчик, 32 года</p>
          <p className="about-me__paragraph">
            Я живу в Санкт-Петербурге. Закончила факультет информационных и управляющих систем Военмеха. Замужем, воспитываю сына. Вкусно готовлю, люблю читать и бегать.
            До декрета работала репетитором по математике, но твёрдо решила, что больше не вернусь к проверке домашних работ и подготовке к выпускным экзаменам.
            Прошла курс на Яндекс.Практикуме, и теперь я фронтенд-разработчик.
          </p>
          <a href="#" className="about-me__link">Github</a>
        </div>
        <img className="about-me__photo" src={photo} />
      </div>
    </section>
  );
}

export default AboutMe;