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
      lists: [],
    };
          console.log(`the user is logged in: ${this.state.isLoggedIn}, under user info ${this.state.user.username}`)

  } // end constructor

  componentDidMount() {

  }

  verify(credentials, callback) {
    $.ajax({
      url: '/login',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(credentials),
      success: (data) => {
        data = data;
        console.log(JSON.parse(data))
          this.setState({isLoggedIn: true});
          // //get user information
          this.setState({lists: JSON.parse(data).lists})
          this.setState({'user': JSON.parse(data).userData});
          callback(JSON.parse(data).loc);
      },
      error: (err) => {
        console.error(err);
      }
    });
  } // end verify

  sendNewUserCredentials(newUserCreds, callback) {
    $.ajax({
      url: '/register',
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
    console.log('USER INFO', this.state)
    const test = { name: 'test' };
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={(props)=>{
            if(this.state.isLoggedIn){
              return <Home {...props}/>
            } else {
              return <Login verify={this.verify.bind(this)} {...props}/>
            }
          }} />
          <Route exact path="/login" render={(props) => (
            <Login verify={this.verify.bind(this)} {...props}/>
          )} />
          <Route exact path="/register" render={(props) => (
            <Register grabUserCredentials={grabCredentials} {...props}/>
          )}/>
          <Route exact path="/logout" component={Login} />
          <Route exact path="/lists" render={(props) => (
            <Lists user={this.state.user} lists={this.state.lists} stores={['walmart', 'kmart', 'target', 'giant', 'wegmans']} {...props}/>
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
