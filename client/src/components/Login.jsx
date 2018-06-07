import React from 'react';
import {Link} from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
    this.verifyCredentials = this.verifyCredentials.bind(this);
  }

  verifyCredentials(e) {
    e.preventDefault();
    // console.log(this.state.username, this.state.password)
    this.props.verify(this.state, (loc) => (this.props.history.push(loc)) );
  }

  handleUsernameChange(e) {
    // console.log(e.target.value)
    this.setState({ username : e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({ password : e.target.value});
  }


  render() {
    return (
      <div className="wrapper">
        <form className="form-signin">
          <h3 className="form-signin-heading">Please login</h3>
          <div>
            <input type="text" className="form-control" placeholder="username" name="login-username" value={this.state.username} onChange={this.handleUsernameChange.bind(this)}/>
          </div>
          <div>
            <input type="password" className="form-control" placeholder="password" name="login-password" value={this.state.password} onChange={this.handlePasswordChange.bind(this)}/>
          </div>
          <div className="text-center">
            <label className="checkbox">
              <input type="checkbox" value="remember-me" id="rememberMe" name="rememberMe" />
              Remember me
            </label>
          </div>
          <div className="text-align">
            <button type="button" className="btn btn-lg btn-primary btn-block" className="btn btn-primary" type="submit" onClick={this.verifyCredentials}>
              Login
            </button>
            <Link to="/register">
              <button type="button" className="btn btn-lg btn-primary btn-block" className="btn btn-secondary" type="submit">
                Register
              </button>
            </Link>
          </div>
        </form>
      </div>
    )
  }
}

/*
  NEED A FUNCTION CALLED VERIFY FROM THE INDEX THAT TAKES IN {USERNAME, PASSWORD}
  NEED A FUNCTION CALLED REDIRECTTOREGISTER THAT WILL BE USED AS A CALLBACK
*/
export default Login;