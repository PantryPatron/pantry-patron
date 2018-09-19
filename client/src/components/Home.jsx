import React from 'react';
import Welcome from '../images/welcome-logo.png';
import NavBar from './Navigation.jsx';

const welcomeStyle = {
  width: '200px',
  height: '100px',
};
const Home = ({ user, history, props }) => {
  let localUser = JSON.parse(window.localStorage.getItem('pantrypatron-data'));

  if (localUser && localUser.userData !== null) {
    localUser = localUser.userData;
  } else {
    history.push('/login');
  }
  const isEmpty = false;
  const display = user => (
    <div className="text-center">
      {/* {...this.passes down match and history} */}
      <NavBar {...props} />
      <br />

      <div className="greeting">
        <img src={Welcome} style={{ width: '300px', height: '120px' }} /> <h3 className="username-display"> {user.username} ! </h3>
      </div>
      <div> Ready to shop mindfully? Check out the list tab to get started </div>

      <br />
      <h3 className="greeting"> Tips </h3>
      {/* BEGIN TIPS */}
      <div />
      <ul>
        <li className="tip">
          Don't go shopping hungry to prevent buying too many snacks!
        </li>
        <li className="tip">
          Bring cash instead of your card so you would have to stick to a budget.
        </li>
        <li className="tip">
          Go for the non-organic stuff, it's cheaper.
        </li>
        <li className="tip">
          Look for the sales tags!
        </li>
        <li className="tip">
          Try out the store brand, they're usually not as bad as you think.
        </li>
        <li className="tip">
          If you have extra money, buy extra non-perishables that you can hold onto if possible.
        </li>
        <li className="tip">
          Canned goods can help you prepare meals quicker. They also don't expire and spoil as fast as normal stuff.
        </li>
        <li className="tip">
          Make it you time, put some music on and walk around, look at everything, you might just find some super specials.
        </li>
      </ul>
      {/* END TIPS */}
    </div>
  );
  console.log(localUser, 'test');

  if (user.username) {
    return display(user);
  } else if (localUser) {
    console.log('local');
    return display(localUser);
  } else {
    history.push('/login');
    return null;
  }
};

export default Home;
