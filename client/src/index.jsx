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
      stores: [],
      user: {},

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
    $.ajax({
      url: 'http://localhost:3000/login',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(credentials),
      success: (data) => {
        data = data;
          console.log('userrrrr',data);
          // this.setState({isLoggedIn: true});
          // //get user information
          // this.setState({user: data.userData.username});
          callback(data.loc);
      },
      error: (err) => {
        console.error(err);
      }
    });
  } // end verify

  sendNewUserCredentials(newUserCreds, callback) {
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
