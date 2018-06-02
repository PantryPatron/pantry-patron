import React from 'react';
import {Link} from 'react-router-dom';
const NavBar = ({onHome, onLists, onLogout}) => (
  <div>
    <div>
      <img src="https://i1.wp.com/www.upbring.org/wp-content/uploads/2017/03/fake-logo-2.png?ssl=1" alt="Pantry Patron Logo" />
      <h1>Pantry Patron</h1>
    </div>
    <div>
      <Link to="/">Home </Link>
      <Link to="/lists">Lists </Link>
      <Link to="/logout">Logout </Link>
      {/*<input type="button" value="Home" onClick={onHome}/>
      <input type="button" value="Lists" onClick={onLists}/>
      <input type="button" value="Logout" onClick={onLogout}/>*/}
    </div>
  </div>
);

export default NavBar;