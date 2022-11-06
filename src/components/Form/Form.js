import './Form.css';
import { Link } from 'react-router-dom';

const Form = ({ buttonValue, question, linkTo, linkText, children, isValid, onSubmit, isError, errorMessage }) => {
  return(
    <form className="form" onSubmit={onSubmit} noValidate>
        <div className="form__wrap">
          {children}
        </div>
        <div className="form__wrap form__wrap_row">
          <span className="form__error">{isError ? errorMessage : ' '}</span>
          <input className="form__button" type="submit" value={buttonValue} disabled={!isValid} />
          <p className="form__paragraph">{question}</p><Link to={linkTo} className="form__link">{linkText}</Link>
        </div>
      </form>
  );
}

export default Form;