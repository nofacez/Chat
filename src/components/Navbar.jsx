import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar navbar-light bg-light">
    <Link to="/" className="navbar-brand">Hexlet Chat</Link>
  </nav>
);

export default Navbar;
