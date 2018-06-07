import React from 'react';
import {Link} from 'react-router-dom';
import $ from 'jquery';


const NavBar = () => (
  <div className="navbar navbar-default navbar-static-top">
    <div className="container">
      <Link to="/">
        <button type="button" className="btn btn-default navbar-btn">Home</button>
      </Link>
      <Link to="/lists">
        <button type="button" className="btn btn-default navbar-btn">Lists</button>
      </Link>
      <Link to="/logout">
        <button type="button" className="btn btn-default navbar-btn">Logout</button>
      </Link>
    </div>
    </div>
);

export default NavBar;