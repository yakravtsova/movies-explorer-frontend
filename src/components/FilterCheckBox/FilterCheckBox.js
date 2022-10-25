import './FilterCheckBox.css';

const FilterCheckbox = () => {
  return(
    <div className="filter-check">
      <label className="filter-check__switch">
        <input type="checkbox" />
        <span className="filter-check__slider"></span>
      </label>
      <h3 className="filter-check__title">Короткометражки</h3>
    </div>
  );
}

export default FilterCheckbox;