import './NavTab.css';

const NavTab = () => {
  return(
    <nav className="navtab">
      <ul className="navtab__wrap">
        <li className="navtab__menu-item"><a href="#about-project" className="navtab__link">О проекте</a></li>
        <li className="navtab__menu-item"><a href="#techs" className="navtab__link">Технологии</a></li>
        <li className="navtab__menu-item"><a href="#about-me" className="navtab__link">Студент</a></li>
      </ul>
    </nav>
  );
}

export default NavTab;