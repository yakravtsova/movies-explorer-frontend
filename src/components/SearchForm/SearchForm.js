import './SearchForm.css';
import searchIcon from '../../images/search-icon.svg';
import FilterCheckbox from '../FilterCheckBox/FilterCheckBox';

const SearchForm = () => {
  return(
    <section className="search-form">
      <div className="search-form__container">
        <form className="search-form__form">
          <fieldset className="search-form__input-container search-form__input-container_feat_search">
            <label className="search-form__label"><img src={searchIcon} className="search-form__icon" alt="Поиск" />
              <input className="search-form__input" placeholder="Фильм" required />
            </label>
            <button type="button" className="search-form__btn" aria-label="Найти"></button>
          </fieldset>
          <div className="search-form__line"></div>
          <fieldset className="search-form__input-container search-form__input-container_feat_filter">
            <FilterCheckbox />
          </fieldset>
        </form>
      </div>
    </section>
  );
}

export default SearchForm;