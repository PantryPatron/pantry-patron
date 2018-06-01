import React from 'react'

const NavBar = ({onHome, onLists, onLogout}) => (
  <div>
    <div>
      <img src="" alt="Pantry Patron Logo" />
      <h1>Pantry Patron</h1>
    </div>
    <div>
      <input type="button" value="Home" onClick={onHome}/>
      <input type="button" value="Lists" onClick={onLists}/>
      <input type="button" value="Logout" onClick={onLogout}/>
    </div>
  </div>
);

export default NavBar;