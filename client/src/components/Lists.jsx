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
    let listName = prompt('What\'s this lists name?');

    while(listName === '') {
      listName = prompt('One cannot create a list with no name');
    }

    var newList = {
      name: listName,
      user_id: user._id
    }

    $.ajax({
      url: '/lists/create',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(newList),
      success: (data) => {
        console.log(JSON.parse(data), 'here is the data')

          this.setState({
            userLists: this.state.userLists.concat([JSON.parse(data)]),
            selectedList: JSON.parse(data)
          });

          this.state.userLists['x'] = {name: null, items: []};
          this.state.userLists['new'] = {name: 'new', items: []};

          console.log('this is the state currently: ', this.state)
          // set the drop down to the list
          $('#list-select').val(this.state.userLists.length -1);
          this.props.update({lists: this.state.userLists});
      },
      err: (err) => {
        console.error(err);
      }
    });
  }

  handleListSelect(e) {
    this.setState({selectedList: this.state.userLists[e.target.value]});
    // console.log(this.state.selectedList)
  }

  render() {
    var display;
    console.log('======> ', this.state.selectedList)
    if(this.state.selectedList.name === 'new') {
      this.handleNewList(this.props.user);
    } else {
      display = !!this.state.selectedList.name ?
     <ListEntry stores={this.props.stores} className='list' list={this.state.selectedList} /> :
     <div id='warning'>Select a list from the<br/>from drop down menu</div>;
    }

    return (
      <div>
      <NavBar {...this.props} />
      <br/>
        <select id="list-select" onChange={this.handleListSelect.bind(this)}>
          <option value='x' key='x' selected> Select </option>
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