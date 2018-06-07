import React from 'react';
import {Link} from 'react-router-dom';
import $ from 'jquery';

const NavBar = () => (
  <div>
    <div>
      <img src="https://i1.wp.com/www.upbring.org/wp-content/uploads/2017/03/fake-logo-2.png?ssl=1" alt="Pantry Patron Logo" />
      <h1>Pantry Patron</h1>
    </div>
    <div>
      <Link to="/">
        <button type="button">
          Home
        </button>
      </Link>
      <Link to="/lists">
        <button tye="button">
          Lists
        </button>
      </Link>
      <Link to="/logout">
        <button type="button">
          Logout
        </button>
      </Link>
    </div>
    </div>
);

export default NavBar;