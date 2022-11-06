import './SearchForm.css';
import useFormWithValidation from '../../utils/hooks/useFormWithValidation';
import searchIcon from '../../images/search-icon.svg';
import FilterCheckbox from '../FilterCheckBox/FilterCheckBox';
import { useEffect, useState } from 'react';
import { SEARCH_REQUEST_EMPTY } from '../../utils/constants/errorMessages';

const SearchForm = ({ handleSearchMovies, req, handleShortFilmCheck, shortFilmsFilter, shortSavedFilmsFilter }) => {
  const [ emptyReqErr, setEmptyReqErr ] = useState(false);
  const formControl = useFormWithValidation({searchReq: req});

  useEffect(() => {
    setEmptyReqErr(false);
  }, [formControl.values.searchReq])

  const handleSubmit = (e) => {
    e.preventDefault();
    const req = formControl.values.searchReq ? formControl.values.searchReq.toLowerCase() : '';
    if (!req) {
      setEmptyReqErr(true);
      return;
    }
    setEmptyReqErr(false);
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
                className={`search-form__input `}
                placeholder="Фильм"
                type="text"
                name="searchReq"
                id="searchReq"
                value={formControl?.values?.searchReq || ''}
                onChange={formControl.handleChange} />
            </label>
            <span className="search-form__error">{emptyReqErr ? SEARCH_REQUEST_EMPTY : ' '}</span>
            </div>
            <input type="submit" value="" className="search-form__btn" aria-label="Найти" />
          </fieldset>
          <div className="search-form__line"></div>
          <fieldset className="search-form__input-container search-form__input-container_feat_filter">
            <FilterCheckbox
              handleShortFilmCheck={handleShortFilmCheck}
              shortFilmsFilter={shortFilmsFilter}
              shortSavedFilmsFilter={shortSavedFilmsFilter} />
          </fieldset>
        </form>
      </div>
    </section>
  );
}

export default SearchForm;