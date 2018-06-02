import React from 'react';

import ListEntry from './ListEntry.jsx';
import NavBar from './Navigation.jsx';

class Lists extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      userLists : this.props.lists || [{items: [{name: 'apples', category_id: 12},{name: 'corn', category_id: 13}], name: 'Walmart', total_price: 25.89}, {items: [], name: 'Kmart', total_price: 25.89}, {items: [], name: 'Target', total_price: 25.89}],
      selectedList: {name: null, items: []}
    };

    this.state.userLists['x'] = {name: null, items: []};
  }

  handleListSelect(e) {
    this.setState({selectedList: this.state.userLists['x']})
    this.setState({selectedList: this.state.userLists[e.target.value]});
    // console.log(this.state.selectedList)
  }

  render() {
    var display = !!this.state.selectedList.name ? <ListEntry id='list' list={this.state.selectedList} /> : <div id='warning'>Select a list from the<br/>from drop down menu</div>;
    return (
      <div>
      <NavBar/>
      <br/>
        <select onChange={this.handleListSelect.bind(this)}>
          <option value='x' key='x'> select </option>
          {
            this.state.userLists.map((list, index) => {
              return <option value={index} key={index}>{list.name}</option>
            })
          }
        </select>
        <br className='line-break'/>
        {display}
      </div>
    );
  }
}

export default Lists;