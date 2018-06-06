import React from 'react';
import {Link} from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
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
      <div className="container-fluid">
          <form>
            <div>
              <input type="text" placeholder="username" name="login-username" value={this.state.username} onChange={this.handleUsernameChange.bind(this)}/>
            </div>
            <div>
              <input type="password" placeholder="password" name="login-password" value={this.state.password} onChange={this.handlePasswordChange.bind(this)}/>
            </div>
            <div>
              <input type="checkbox" id="remember-me"/>
              <label htmlFor="remember-me">
                Remember Me
              </label>
            </div>
            <button type="button" onClick={this.verifyCredentials.bind(this)}>
              Login
            </button>
            <Link to="/register">
              <button type="button">
                Register
              </button>
            </Link>
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