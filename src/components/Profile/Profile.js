import './Profile.css';

const Profile = () => {
  return(
    <section className="profile">
    <h1 className="profile__title">Привет, Маргарита!</h1>
      <form className="profile__form">
        <div className="profile__form-wrap">
          <label className="profile__label">Имя
            <input value="Маргарита" className="profile__input" />
          </label>
          <div className="profile__line"></div>
          <label className="profile__label">E-mail
            <input value="pochta@yandex.ru" className="profile__input" />
          </label>
        </div>
        <div className="profile__form-wrap">
          <button className="profile__button" type="submit">Редактировать</button>
          <button className="profile__button profile__button_feat_exit" type="submit">Выйти из аккаунта</button>
        </div>
      </form>

    </section>
  );
}

export default Profile;