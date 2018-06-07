import React from 'react';
import {Link} from 'react-router-dom'

class Register extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username:'',
      entry: '',
      reEntry: ''
    }

  } // end constructor

  checkPasswords(callback) {
    // check to see if passwords are the same
    let match = this.state.entry === this.state.reEntry && (this.state.entry !== '' && this.state.reEntry !== '') ;

    if(match){
      // send username and pasword information to callback  to be processed later
      callback({username: this.state.username, password: this.state.entry}, (loc)  => {
        this.props.history.push(loc);
      });
      // console.log(this.state.username, this.state.entry, 'was saved.')
    } else {
      // figure out how to display a div of color red
      console.log('passwords do not match');
    }
  }

  // changes state on change of values
  handleUsername(e) {
    this.setState({username: e.target.value})
  }

  handleEntryChange(e) {
    this.setState({entry: e.target.value})
  }

  handleReEntryChange(e) {
    this.setState({reEntry: e.target.value})
  }

  render() {
    console.log(this.props)
    return (
      <div>
    {/*Header*/}
        <div>
      {/*makes the button the link */}
          <Link to="/login">
            <button type="button">
              Login
            </button>
          </Link>
          <h3>Register</h3>
        </div>
      {/*User information*/}
        <form>
          <div>
            <input type="text" placeholder="username" name="register-username" value={this.state.username} onChange={this.handleUsername.bind(this)}/>
          </div>
          <div>
            <input type="password" placeholder="password" value={this.state.entry} name="register-password" onChange={this.handleEntryChange.bind(this)}/>
          </div>
          <div>
            <input type="password" placeholder="re-enter password"  value={this.state.reEntry}
              onChange={this.handleReEntryChange.bind(this)} name="register-password-reentry"/>
          </div>
          <div>
            <button type="button" onClick={() => (this.checkPasswords(this.props.grabUserCredentials))}>Register</button>
          </div>
        </form>
      </div>
    );
  } // end render
}
// NEED GRABNEWUSERCREDENTIALS CALLBACK FUNCTION THAT TAKES AN OBJECT {USERNAME, PASSWORD}

export default Register;