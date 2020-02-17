import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.scss';

function Navigation() {
  return (
    <header>
      <nav className="navigation">
        <div className="navigation__top-bar">
          <div className="navigation__top-bar__elements">
            <a href="https://www.adidas.com/us/help" className="right-separation" target="_blank" rel="noopener noreferrer">HELP </a>
            <a href="https://www.adidas.com/us/order-tracker" target="_blank" rel="noopener noreferrer">ORDER TRACKER AND RETURNS </a>
            <button className="button">JOIN CREATORS CLUB </button>
            <a href="https://www.adidas.com/us/creatorsclub" target="_blank" rel="noopener noreferrer">CREATORS CLUB </a>
            <a href="https://www.adidas.com/us/account-login" target="_blank" rel="noopener noreferrer">LOG IN</a>
          </div>
        </div>
        <div className="navigation__navbar">
          <div className="navigation__navbar__collapse">
            <ul className="navigation__navbar__list">
              <li className="navigation__navbar__item">
                <Link to="/">Home</Link>
              </li>
              <li className="navigation__navbar__item">
                <Link to="/cart">Cart</Link>
              </li>
            </ul>

            <form className="form--search">
              <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navigation;
