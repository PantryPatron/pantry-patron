import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';

import $ from 'jquery';
const Test = () => (<div>Testing this shiz out </div>);
const App = () => (
  <Router>
    <Switch>
      <Route exact path='/' component={Test}/>
    </Switch>
  </Router>
);

ReactDOM.render(<App />, document.getElementById('app'));