import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.verifyCredentials = this.verifyCredentials.bind(this);
  } // end constructor

  verifyCredentials(e) {
    e.preventDefault();
    this.props.verify(this.state, loc => (this.props.history.push(loc)));
  } // end verifyCredentials

  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  } // end handleUsernameChange

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  } // end handlePasswordChange


  render() {
    return (
      <div className="wrapper">
        <div className="signin-error form-error" hidden>Test</div>
        <form className="form-signin">
          <h3 className="form-signin-heading">Please login</h3>
          <div>
            <input
              type="text"
              className="form-control"
              placeholder="username"
              name="login-username"
              value={this.state.username}
              onChange={this.handleUsernameChange.bind(this)}
            />
          </div>
          <div>
            <input
              type="password"
              className="form-control"
              placeholder="password"
              name="login-password"
              value={this.state.password}
              onChange={this.handlePasswordChange.bind(this)}
            />
          </div>
          <div className="text-align">
            <button
              type="button"
              className="btn btn-lg btn-primary btn-block"
              className="btn btn-primary"
              type="submit"
              onClick={this.verifyCredentials}
            >
              Login
            </button>
            <Link to="/register">
              <button
                type="button"
                className="btn btn-lg btn-primary btn-block"
                className="btn btn-secondary"
                type="submit"
              >
                Register
              </button>
            </Link>
          </div>
        </form>
      </div>
    );
  } // end return
} // end Login

export default Login;
