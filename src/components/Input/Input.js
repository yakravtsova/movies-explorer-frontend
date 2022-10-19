import './Input.css';

const Input = ({ inputName, inputLabel, errorMessage, value, placeholder }) => {
  return(
    <>
      <label for={inputName} className="input__label">{inputLabel}</label>
      <input type="text" id={inputName} className={`input__input ${errorMessage && 'input__input_error'}`} value={value} placeholder={placeholder} />
      <span className="input__error">{errorMessage ? errorMessage : ' '}</span>
    </>
  );
}

export default Input;