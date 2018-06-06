import React from 'react';
import {Link} from 'react-router-dom';
import $ from 'jquery';

class NavBar extends React.Component{
  constructor(props){
    super(props);
  }

  redirectTo(loc) {
    this.props.history.push(loc);
  }

  logout() {
    var redirect = this.redirectTo.bind(this);

    $.ajax({
      url: '/logout',
      type: 'GET',
      success: (loc) => {
       if(loc) {
        redirect(loc);
       }
      },
      error: (err) => {
        console.error(err);
      }
    });
  } // end logout

  render(){
    return (
      <div>
        <div>
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
          <button onClick={() => (this.logout())} type="button">
            Logout
          </button>
        </div>
      </div>
    );
  }
};

export default NavBar;