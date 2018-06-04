import React from 'react';

import NavBar from './Navigation.jsx';
class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lists: props.lists || [],
      selected: props.selected || {name: 'slkjsi', total_price: 12, items: []},
      onEdit: props.onEdit,
    };
  }

  render() {
    return (
      <div>
    {/*{...this.props passes down match and history}*/}
        <NavBar logout={this.props.logout} {...this.props}/>
        <br/>
        <div>
          <div>
            <p>Chart here</p>
          </div>
          <div>
            <p>Verbal Stats Here</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;