import React from 'react';
import {Link} from 'react-router-dom';
class NavBar extends React.Component{
  constructor(props){
    super(props);
    console.log(this.props)
  }

  render(){
    return (
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
          <button onClick={() => (this.props.logout())} type="button">
            Logout
          </button>
        </div>
      </div>
    );
  }
};

export default NavBar;