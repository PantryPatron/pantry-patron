import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
} from 'react-router-dom';

import $ from 'jquery';


// components
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Logout from './components/Logout.jsx';
import Lists from './components/Lists.jsx';
// WE NEED TO DOWNLOAD AND IMPORT BCRYPT

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn :false,
      stores: []
    };
  } // end constructor

  componentDidMount() {
    this.getStoresAvailable();
  }

  getStoresAvailable() {
    $.ajax({
      /*Come back to later */
    });
  }

  verify(credentials, callback) {
    /*
    grab the record of the user account that belongs to username
      if it exists
        use BCRYPT to hash the password using the salt provided
        if the passwords match
          redirect to home
      if it does not exists
        force refresh/ redirect to login
    */
    $.ajax({
      url: 'http://localhost:3000/login',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(credentials),
      success: (loc) => {
        if(loc = '/') {
          this.setState({isLoggedIn: true})
          callback(loc);
        }
      },
      error: (err) => {
        console.error(err);
      }
    });
  } // end verify

  sendNewUserCredentials(newUserCreds, callback) {
    /*
      maybe create an endpoint in the server that saves new user info to db
      make a post ajax call to save new user information to database

      {
        url: 'http://localhost:3000/new_user',    <----- we might be able to make this dynamic eg) /new/user
        type: 'POST',
        data: {
          newUserCreds
        },
        sucess: console.log.bind(console, 'Woo! Welcome to Pantry Patron! Hope we can save you some money'),
        error: console.error.bind(console, error);
      }
    */
    $.ajax({
      url: 'http://localhost:3000/register',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(newUserCreds),
      success: (loc) => {
        console.log('New user information saved to db')
        callback(loc);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  render() {
    var grabCredentials = this.sendNewUserCredentials.bind(this);

    const test = { name: 'test' };
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={(props)=>(
            <Home {...props}/>
          )} />
          <Route exact path="/login" render={(props) => (
            <Login verify={this.verify.bind(this)} {...props}/>
          )} />
          <Route exact path="/register" render={(props) => (
            <Register grabUserCredentials={grabCredentials} {...props}/>
          )}/>
          <Route exact path="/logout" component={Login} />
          <Route exact path="/lists" render={(props) => (
            <Lists stores={['walmart', 'kmart', 'target', 'giant', 'wegmans']} {...props}/>
          )} />
        </Switch>
      </Router>
    );
  } // end render
}

ReactDOM.render(<App />, document.getElementById('app'));


/*
/'
/login
/register
/logout
/list

------------> think about we add a /list/edit  <-----  new challenge!!!!!!

*/
