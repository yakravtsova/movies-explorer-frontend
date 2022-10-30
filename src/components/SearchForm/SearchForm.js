import './SearchForm.css';
import useFormWithValidation from '../../utils/hooks/useFormWithValidation';
import searchIcon from '../../images/search-icon.svg';
import FilterCheckbox from '../FilterCheckBox/FilterCheckBox';
import { useEffect } from 'react';

const SearchForm = ({ handleSearchMovies, req }) => {
  const formControl = useFormWithValidation({searchReq: req});
  const { searchReq } = formControl.errors;

  useEffect(() => {
    console.log(req)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    const req = formControl.values.searchReq.toLowerCase();
    handleSearchMovies(req);
  }

  return(
    <section className="search-form">
      <div className="search-form__container">
        <form className="search-form__form" onSubmit={handleSubmit} noValidate>
          <fieldset className="search-form__input-container search-form__input-container_feat_search">
            <div className="search-form__input-wrap">
            <label htmlFor="searchReq" className="search-form__label"><img src={searchIcon} className="search-form__icon" alt="Поиск" />
              <input
                className={`search-form__input ${searchReq && 'search-form__input_error'}`}
                placeholder="Фильм"
                type="text"
                name="searchReq"
                id="searchReq"
                value={formControl?.values?.searchReq || ''}
                onChange={formControl.handleChange}
                required />
            </label>
            <span className="search-form__error">{searchReq ? "Нужно ввести ключевое слово" : " "}</span>
            </div>
            <input type="submit" value="" className="search-form__btn" aria-label="Найти" disabled={!formControl.isValid} />
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