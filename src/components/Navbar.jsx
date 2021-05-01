import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useUser } from './context/UserContext.jsx';

const Navbar = () => {
  const { t } = useTranslation();
  const { user, logOut } = useUser();
  const { localStorage } = window;
  const handleLogout = () => {
    localStorage.removeItem('user');
    logOut();
  };
  return (
    <nav className="navbar navbar-light bg-light mb-3">
      <Link to="/" className="navbar-brand">{ t('titles.nav') }</Link>
      { user && <Button type="button" varian="primary" onClick={handleLogout}>{ t('buttons.logout') }</Button> }
    </nav>
  );
};

export default Navbar;
