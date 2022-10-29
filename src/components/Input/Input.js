import './Input.css';

const Input = ({ type, inputName, inputLabel, errorMessage, value, placeholder, onChange, minLength, maxLength, regex }) => {
  return(
    <>
      <label htmlFor={inputName} className="input__label">{inputLabel}</label>
      <input
        type={type}
        id={inputName}
        name={inputName}
        className={`input__input ${errorMessage && 'input__input_error'}`}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        minLength={minLength}
        maxLength={maxLength}
        pattern={regex}
        required />
      <span className="input__error">{errorMessage || ' '}</span>
    </>
  );
}

export default Input;