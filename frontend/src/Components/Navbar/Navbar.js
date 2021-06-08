import React from 'react';
import SearchBox from '../SearchBox/SearchBox';
import logo from '../../Resources/logo2x.png';

export default function Navbar() {
  return (
    <header className="nav">
      <a href="/">
        <img className="logo" alt="Mercado Livre" src={logo} />
      </a>
      <SearchBox />
    </header>
  );
}
