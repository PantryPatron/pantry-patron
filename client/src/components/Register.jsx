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
        this.props.history.push('/');
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
      <div className="wrapper">
        <form className="form-signin">
          <Link to="/login">
            <button
              className="btn btn-lg btn-primary btn-sm btn-block"
              type="submit"
              type="button">
              Back to Login
            </button>
          </Link>
          <h3 className="form-signin-heading">Register</h3>
          <div>
            <input type="text" className="form-control" placeholder="username" name="register-username" value={this.state.username} onChange={this.handleUsername.bind(this)}/>
          </div>
          <div>
            <input type="password" className="form-control" placeholder="password" name="register-password" value={this.state.password} onChange={this.handleEntryChange.bind(this)}/>
          </div>
          <div>
            <input type="password" className="form-control" placeholder="re-enter password"  value={this.state.reEntry}
              onChange={this.handleReEntryChange.bind(this)} name="register-password-reentry"/>
          </div>
          <div className="text-align">
            <button
              type="button"
              className="btn btn-lg btn-primary btn-block"
              type="submit"
              onClick={() => (this.checkPasswords(this.props.grabUserCredentials))}>Register
            </button>
          </div>
        </form>
      </div>
    );
  } // end render
}
// NEED GRABNEWUSERCREDENTIALS CALLBACK FUNCTION THAT TAKES AN OBJECT {USERNAME, PASSWORD}

export default Register;