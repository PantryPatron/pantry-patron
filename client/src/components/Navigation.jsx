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

// MOVE STYLE INTO ABOVE
//   render(){
//     return (
//       <div className="navbar navbar-default navbar-static-top">
//         <div className="container">
//           <Link to="/">
//             <button type="button" className="btn btn-default navbar-btn">Home</button>
//           </Link>
//           <Link to="/lists">
//             <button type="button" className="btn btn-default navbar-btn">Lists</button>
//           </Link>
//           <button type="button" className="btn btn-default navbar-btn" onClick={() => (this.logout())} type="button">
//             Logout
//           </button>
//         </div>
//       </div>
//     );
//   }
// };

export default NavBar;