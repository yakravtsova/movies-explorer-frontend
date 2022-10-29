import './InputProfile.css';

const InputProfile = ({ type, inputName, inputLabel, errorMessage, value, placeholder, onChange, minLength, maxLength, regex }) => {
  return(
    <>
      <label htmlFor={inputName} className="input-profile__label">{inputLabel}
        <input
          type={type}
          id={inputName}
          name={inputName}
          className={`input-profile__input ${errorMessage && 'input-profile__input_error'}`}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          minLength={minLength}
          maxLength={maxLength}
          pattern={regex}
          required />
      </label>
      <span className="input-profile__error">{errorMessage || ' '}</span>
    </>
  );
}

export default InputProfile;