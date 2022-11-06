import useFormWithValidation from '../../utils/hooks/useFormWithValidation';
import StartPage from '../StartPage/StartPage';
import Form from '../Form/Form';
import Input from '../Input/Input';
import WelcomeTitle from '../WelcomeTitle/WelcomeTitle';
import { useEffect } from 'react';

const Register = ({ handleRegister, isError, errorMessage, removeError }) => {
  const formControl = useFormWithValidation();
  const {name, email, password} = formControl.errors;

  useEffect(() => {
    removeError();
    formControl.resetForm();
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formControl.values);
    handleRegister(formControl.values);
  }

  return(
    <StartPage>
      <WelcomeTitle title="Добро пожаловать!" />
      <Form
        buttonValue="Зарегистрироваться"
        question="Уже зарегистрированы?"
        linkTo="/signin"
        linkText="Войти"
        isValid={formControl.isValid}
        onSubmit={handleSubmit}
        isError={isError}
        errorMessage={errorMessage} >
        <Input
          type="text"
          inputName="name"
          inputLabel="Имя"
          errorMessage={name}
          value={formControl?.values?.name || ''}
          placeholder="Введите имя"
          onChange={formControl.handleChange}
          minLength={2}
          maxLength={30} />
        <Input
          type="email"
          inputName="email"
          inputLabel="E-mail"
          errorMessage={email}
          value={formControl?.values?.email || ''}
          placeholder="Укажите email"
          onChange={formControl.handleChange}
          minLength={2}
          maxLength={30}
          regex="(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|'(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*')@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])" />
        <Input
          type="password"
          inputName="password"
          inputLabel="Пароль"
          errorMessage={password}
          value={formControl?.values?.password || ''}
          placeholder="Придумайте пароль"
          onChange={formControl.handleChange}
          minLength={2}
          maxLength={30} />
      </Form>
    </StartPage>
  );
}

export default Register;