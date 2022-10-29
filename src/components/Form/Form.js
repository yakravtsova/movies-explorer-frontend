import './Form.css';
import { Link } from 'react-router-dom';

const Form = ({ buttonValue, question, linkTo, linkText, children, isValid, onSubmit }) => {
  return(
    <form className="form" onSubmit={onSubmit} noValidate>
        <div className="form__wrap">
          {children}
        </div>
        <div className="form__wrap form__wrap_row">
          <input className="form__button" type="submit" value={buttonValue} disabled={!isValid} />
          <p className="form__paragraph">{question}</p><Link to={linkTo} className="form__link">{linkText}</Link>
        </div>
      </form>
  );
}

export default Form;