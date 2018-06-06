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
      <div className="navbar navbar-default navbar-static-top">
        <div className="container">
          <Link to="/">
            <button type="button" className="btn btn-default navbar-btn">Home</button>
          </Link>
          <Link to="/lists">
            <button type="button" className="btn btn-default navbar-btn">Lists</button>
          </Link>
          <button type="button" className="btn btn-default navbar-btn" onClick={() => (this.logout())} type="button">
            Logout
          </button>
        </div>
      </div>
    );
  }
};

export default NavBar;