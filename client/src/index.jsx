import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import $ from 'jquery';


// components
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Lists from './components/Lists.jsx';

/*
  connected to the resgister component. This function sends a new users credentials
  to the database to be hashed, salted, and stored.

  object = {
    username: <username>,
    password: <password>
  }

*/

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      stores: [],
      user: {},
      lists: [],
    };

    this.verify = this.verify.bind(this);
    this.update = this.update.bind(this);
    this.deleteList = this.deleteList.bind(this);
  }

  sendNewUserCredentials(newUserCreds, callback) {
    $.ajax({
      url: '/register',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(newUserCreds),
      success: (loc) => {
        console.log('New user information saved to db');
        callback(loc);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  /*
  once the app mounts, grab the stores from the database
  */
  componentDidMount() {
    this.getStores();
  }

  /*
    When invoked this function makes a post request to
    /store/create passing in a newStoreNameObj

    newStoreNameObj = {
       name: <storeName>
     }

     it returns a document from a Store collection that contains
      {
        _id: <ObjectId>,
        name: <store name>
      }
  */
  createNewStore(newStoreNameObj, callback) {
    $.ajax({
      url: '/store/create',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(newStoreNameObj),
      success: (data) => {
        this.getStores();
        if (callback) { callback(JSON.parse(data)); }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  /*
    retrieves all Mongoose Store Collection document from the data base.

    type: Array
  */
  getStores() {
    $.ajax({
      url: '/store/search',
      type: 'GET',
      contentType: 'application/json',
      success: (data) => {
        this.setState({ stores: JSON.parse(data) });
      },
      error: (err) => {
        console.error(`${err}in getStores function`);
      },
    });
  }

  update(data, callback) {
    console.log('updated');
    this.setState(data);
    if (callback) callback();
  }

  /*
    connected to the Login component, verifies user entered credentials with the documents
    in the database. If sucessful, should return the user information and the grocerylists that user has.

  */
  verify(credentials, callback) {
    $.ajax({
      url: '/login',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(credentials),
      success: (data) => {
        data = JSON.parse(data);
        if (data.loc === '/') {
          window.localStorage.setItem('pantrypatron-data', JSON.stringify(data));
          this.setState({ isLoggedIn: true });
          // //get user information
          this.setState({ lists: data.lists || [] });
          this.setState({ user: data.userData || {} });
          callback(data.loc);
        } else {
          $('.signin-error').text(data.message).show();
          console.log('Account does not exist');
        }
      },
      error: (err) => {
        console.error(err);
        callback('/login');
      },
    });
  } // end verify

  /*
  sends the ObjectId of a list to the server for deletion
  */
  deleteList({ _id }) {
    $.ajax({
      url: '/lists/delete',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ _id }),
      success: (deletedId) => {
        if (!deletedId) {
          console.error('No response from server');
          return;
        }

        const lists = this.state.lists.filter(list => list._id !== deletedId);

        this.setState({ lists });
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={props => <Home {...props} user={this.state.user} />}
          />
          <Route
            exact
            path="/login"
            render={props => <Login verify={this.verify} {...props} />}
          />
          <Route
            exact
            path="/register"
            render={props => <Register grabUserCredentials={this.sendNewUserCredentials.bind(this)} {...props} />
            }
          />
          <Route exact path="/logout" render={props => <Login verify={this.verify} {...props} />} />
          <Route
            exact
            path="/lists"
            render={props => (<Lists
              user={this.state.user}
              lists={this.state.lists}
              update={this.update.bind(this)}
              stores={this.state.stores}
              createStore={this.createNewStore.bind(this)}
              deleteList={this.deleteList}
              {...props}
            />)}
          />
        </Switch>
      </Router>
    );
  } // end render
} // end App

ReactDOM.render(<App />, document.getElementById('app'));
