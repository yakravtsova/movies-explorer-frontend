import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import words from '../../images/33-words.png';
import years from '../../images/100-years.png';
import banksy from '../../images/banksy-most-wanted.png';
import baskia from '../../images/boom-for-real.png';
import { useLocation } from 'react-router-dom';

const MoviesCardList = () => {
  const loc = useLocation();
  const isMovies = (loc.pathname === '/movies');

  return(
    <section className="card-list">
      <ul className="card-list__list">
        <MoviesCard url={words} name="33 слова о дизайне" duration={102} isMovies={isMovies} />
        <MoviesCard url={years} name="Киноальманах &laquo;100 лет дизайна&raquo;" duration={102} isMovies={isMovies} />
        <MoviesCard url={banksy} name="В погоне за Бенкси" duration={102} isMovies={isMovies} />
        <MoviesCard url={baskia} name="Баския: Взрыв реальности" duration={102} isMovies={isMovies} />
        <MoviesCard url={words} name="Бег это свобода" duration={102} isMovies={isMovies} />
        <MoviesCard url={years} name="Книготорговцы" duration={102} isMovies={isMovies} />
        <MoviesCard url={banksy} name="Когда я думаю о Германии ночью" duration={102} isMovies={isMovies} />
        <MoviesCard url={baskia} name="Gimme Danger: История Игги и The Stooges" duration={102} isMovies={isMovies} />
        <MoviesCard url={words} name="Дженис: Маленькая девочка грустит" duration={102} isMovies={isMovies} />
        <MoviesCard url={years} name="Соберись перед прыжком" duration={102} isMovies={isMovies} />
        <MoviesCard url={banksy} name="Пи Джей Харви: A dog called money" duration={102} isMovies={isMovies} />
        <MoviesCard url={baskia} name="По волнам: Искусство звука в кино" duration={102} isMovies={isMovies} />
        <MoviesCard url={words} name="Рудбой" duration={102} isMovies={isMovies} />
        <MoviesCard url={years} name="Скейт — кухня" duration={102} isMovies={isMovies} />
        <MoviesCard url={banksy} name="Война искусств" duration={102} isMovies={isMovies} />
        <MoviesCard url={baskia} name="Зона" duration={102} isMovies={isMovies} />
      </ul>
      <button className="card-list__btn">Ещё</button>
    </section>
  );
}

export default MoviesCardList;