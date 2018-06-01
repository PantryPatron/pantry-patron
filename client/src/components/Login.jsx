import React from 'react';

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
    this.props.verify(this.state);
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
      <div>
          <form>
            <img src="https://i1.wp.com/www.upbring.org/wp-content/uploads/2017/03/fake-logo-2.png?ssl=1"/>
            <div>
              <input type="text" placeholder="username" name="login-username" value={this.state.username} onChange={this.handleUsernameChange.bind(this)}/>
            </div>
            <div>
              <input type="password" placeholder="password" name="login-password" value={this.state.password} onChange={this.handlePasswordChange.bind(this)}/>
            </div>
            <div>
              <input type="checkbox" id="remember-me"/>
              <label for="remember-me">Remember Me</label>
            </div>
            <button type="button" onClick={this.verifyCredentials.bind(this)}>Login</button><button onClick={() => (this.props.redirectToRegister())}>Register</button>
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