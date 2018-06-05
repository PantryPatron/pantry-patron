import React from 'react';
import $ from 'jquery';

import ListEntry from './ListEntry.jsx';
import NavBar from './Navigation.jsx';

class Lists extends React.Component{
  constructor(props) {

    super(props);
    this.state = {
      userLists :  this.props.lists || [],
      selectedList: {name: null, items: []}
    };

    this.state.userLists['x'] = {name: null, items: []};
    this.state.userLists['new'] = {name: 'new', items: []};
  }

  handleNewList(user) {
    console.log('This is the user I got', user)
    var newList = {
      name: prompt('What\'s this lists name?'),
      user_id: user._id
    }

    $.ajax({
      url: '/lists/create',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(newList),
      success: (data) => {
        this.setState({selectedList: JSON.parse(data)});
      },
      err: (err) => {
        console.error(err);
      }
    });
  }

  handleListSelect(e) {
    this.setState({selectedList: this.state.userLists['x']})
    this.setState({selectedList: this.state.userLists[e.target.value]});
    // console.log(this.state.selectedList)
  }

  render() {
    var display;
      console.log('The user being used is ', this.props.lists)
    if(this.state.selectedList.name === 'new') {
      this.handleNewList(this.props.user);
    } else {
      display = !!this.state.selectedList.name ?
     <ListEntry stores={this.props.stores} id='list' list={this.state.selectedList} /> :
     <div id='warning'>Select a list from the<br/>from drop down menu</div>;
    }

    return (
      <div>
      <NavBar {...this.props} />
      <br/>
        <select onChange={this.handleListSelect.bind(this)}>
          <option value='x' key='x'> Select </option>
          <option value='new' key='new'>New list</option>
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