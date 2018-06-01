import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';

import $ from 'jquery';


// components
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Logout from './components/Logout.jsx';
import Lists from './components/Lists.jsx';
// WE NEED TO DOWNLOAD AND IMPORT BCRYPT
import ItemForm from './components/ItemForm.jsx'

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      /*Fill me up, buttercup*/
    };
  } // end constructor

  verify(credentials) {
    /*
    grab the record of the user account that belongs to username
      if it exists
        use BCRYPT to hash the password using the salt provided
        if the passwords match
          redirect to home
      if it does not exists
        force refresh/ redirect to login
    */
  } // end verify

  redirectTo() {
    /*
    HOW DO YOU REDIRECT TO RENDER AHHHH!
    */
  } // end redirectTo

  grabNewUserCredentials(newUserCreds) {
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
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/register' component={Register}/>
          <Route exact path='/logout' component={Logout}/>
          <Route exact path='/lists' component={Lists}/>
          <Route exact path='/test' component={ItemForm}/>
        </Switch>
      </Router>
    );
  } // end render
};

ReactDOM.render(<App />, document.getElementById('app'));


/*
/'
/login
/register
/logout
/list

------------> How about we add a /list/edit  <-----  new challenge!!!!!!

*/