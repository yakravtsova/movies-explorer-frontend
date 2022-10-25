import './AccountLink.css';
import { NavLink } from 'react-router-dom';

const AccountLink = () => {
  return(
    <NavLink to="/profile" className="account-link">Аккаунт</NavLink>
  );
}

export default AccountLink;