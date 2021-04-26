import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { t } = useTranslation();
  return (
    <nav className="navbar navbar-light bg-light mb-3">
      <Link to="/" className="navbar-brand">{ t('navbar.title') }</Link>
    </nav>
  );
};

export default Navbar;
