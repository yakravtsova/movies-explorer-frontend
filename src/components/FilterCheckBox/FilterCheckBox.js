import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './FilterCheckBox.css';

const FilterCheckbox = ({ handleShortFilmCheck, shortFilmsFilter, shortSavedFilmsFilter }) => {
  const loc = useLocation();
  const shortFilmCheck = localStorage.getItem('shortFilmCheck') === "true" ? true : false;
  const isMovies = loc.pathname === '/movies';
  const isChecked = isMovies ? shortFilmCheck : false;
  useEffect(() => {
    handleShortFilmCheck(isChecked);
  }, [])

  const handleCheck = (e) => {
    const checked = e.target.checked;
    handleShortFilmCheck(checked);
    if (isMovies) {
      shortFilmsFilter(checked);
      localStorage.setItem('shortFilmCheck', checked);
    }
    else {
      shortSavedFilmsFilter(checked);
    }
}
  return(
    <div className="filter-check">
      <label className="filter-check__switch">
        <input type="checkbox" name="shortFilmCheck" id="shortFilmCheck" onClick={handleCheck} defaultChecked={isChecked} />
        <span className="filter-check__slider"></span>
      </label>
      <h3 className="filter-check__title">Короткометражки</h3>
    </div>
  );
}

export default FilterCheckbox;