import './SearchForm.css';
import searchIcon from '../../images/search-icon.svg';

const SearchForm = () => {
  return(
    <section className="search-form">
      <div className="search-form__container">
        <form className="search-form__form">
          <label className="search-form__label"><img src={searchIcon} className="search-form__icon" />
            <input className="search-form__input" placeholder="Фильм" />
          </label>
        </form>
      </div>
    </section>
  );
}

export default SearchForm;