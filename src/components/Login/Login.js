import StartPage from '../StartPage/StartPage';
import Form from '../Form/Form';
import Input from '../Input/Input';
import WelcomeTitle from '../WelcomeTitle/WelcomeTitle';

const Login = () => {
  return(
    <StartPage>
      <WelcomeTitle title="Рады видеть!" />
      <Form buttonValue="Войти" question="Ещё не зарегистрированы?" linkTo="/signup" linkText="Регистрация" >
        <Input inputName="email" inputLabel="E-mail" placeholder="Введите email" />
        <Input inputName="password" inputLabel="Пароль" placeholder="Введите пароль" />
      </Form>
    </StartPage>
  );
}

export default Login;