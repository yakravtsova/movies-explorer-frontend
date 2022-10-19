import StartPage from '../StartPage/StartPage';
import Form from '../Form/Form';
import Input from '../Input/Input';
import WelcomeTitle from '../WelcomeTitle/WelcomeTitle';

const Register = () => {
  return(
    <StartPage>
      <WelcomeTitle title="Добро пожаловать!" />
      <Form buttonValue="Зарегистрироваться" question="Уже зарегистрированы?" linkTo="/signin" linkText="Войти" >
        <Input inputName="name" inputLabel="Имя" value="Маргарита" placeholder="Введите имя" />
        <Input inputName="email" inputLabel="E-mail" value="pochta@yandex.ru" placeholder="Укажите email" />
        <Input inputName="password" inputLabel="Пароль" value="••••••••••••••" errorMessage="Что-то пошло не так..." placeholder="Придумайте пароль" />
      </Form>
    </StartPage>
  );
}

export default Register;