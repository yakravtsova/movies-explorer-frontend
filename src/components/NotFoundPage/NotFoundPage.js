import './NotFoundPage.css';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return(
    <section className="not-found">
      <div className="not-found__container">
        <p className="not-found__status">404</p>
        <h2 className="not-found__message">Страница не найдена</h2>
      </div>
      <button className="not-found__back" onClick={() => navigate(-1)}>Назад</button>
    </section>
  );
}

export default NotFoundPage;