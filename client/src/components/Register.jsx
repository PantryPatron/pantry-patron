import React from 'react';

function Register(props) {
  return (
    <div>
      <div>
        <button>Login</button>
        <h3>Register</h3>
      </div>
      <div>
        <img src="https://i1.wp.com/www.upbring.org/wp-content/uploads/2017/03/fake-logo-2.png?ssl=1"/>
      </div>
      <div>
        <input type="text" placeholder="username" name="register-username"/>
      </div>
      <div>
        <input type="password" placeholder="password" name="register-password"/>
      </div>
      <div>
        <input type="password" placeholder="re-enter password" name="register-password-reentry"/>
      </div>
      <div>
        <button>Register</button>
      </div>
    </div>
  );
}

export default Register;