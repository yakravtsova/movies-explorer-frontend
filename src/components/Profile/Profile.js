import { useContext, useEffect, useState } from 'react';
import useFormWithValidation from '../../utils/hooks/useFormWithValidation';
import './Profile.css';
import InputProfile from '../InputProfile.js/InputProfile';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const Profile = ({ handleEditUserData, handleLogOut }) => {
  const currentUser = useContext(CurrentUserContext);
  const formControl = useFormWithValidation({email: currentUser.email, name: currentUser.name});
  const { name, email } = formControl.errors;
  const [ isChanged, setIsChanged ] = useState(false);

  useEffect(() => {
    setIsChanged(!(currentUser.name === formControl.values.name && currentUser.email === formControl.values.email));

  }, [currentUser, formControl.values.name, formControl.values.email])

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditUserData(formControl.values);
  }

  return(
    <section className="profile">
    <h1 className="profile__title">Привет, {currentUser.name}!</h1>
      <form className="profile__form" onSubmit={handleSubmit} noValidate>
        <div className="profile__form-wrap">
        <InputProfile
          type="text"
          inputName="name"
          inputLabel="Имя"
          errorMessage={name}
          value={formControl?.values?.name || ''}
          placeholder="Введите имя"
          onChange={formControl.handleChange}
          minLength={2}
          maxLength={30} />
        <div className="profile__line"></div>
        <InputProfile
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
        </div>
        <div className="profile__form-wrap">
          <input className="profile__button" type="submit" value="Редактировать" aria-label="Редактировать" disabled={!formControl.isValid || !isChanged} />
          <button className="profile__button profile__button_feat_exit" type="button" aria-label="Выйти из аккаунта" onClick={handleLogOut}>Выйти из аккаунта</button>
        </div>
      </form>

    </section>
  );
}

export default Profile;