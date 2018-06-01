import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authorized: false
    }
  }

  render() {
    return (
      <div>
        <img src="https://i1.wp.com/www.upbring.org/wp-content/uploads/2017/03/fake-logo-2.png?ssl=1"/>
        <div>
          <input type="text" placeholder="username" name="login-username"/>
        </div>
        <div>
          <input type="password" placeholder="password" name="login-password"/>
        </div>
        <div>
          <input type="checkbox" id="remember-me"/>
          <label for="remember-me">Remember Me</label>
        </div>
        <button>Login</button><button>Register</button>
      </div>
    )
  }
}


export default Login;