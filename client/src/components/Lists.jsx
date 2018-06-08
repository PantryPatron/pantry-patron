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

    this.handleListSelect = this.handleListSelect.bind(this);
  }

  componentDidMount() {
    var context = this;
    $('#list-select').on( 'mouseover',(e) => {
      setTimeout(() => {
        if( $('#list-select').is(':hover')) {
          context.setState({selectedList: this.state.userLists['x']});
          $('#list-select').val('x').change();
        }
      }, 500);
    })
  }

  updateList(newItem, callback) {
    $.ajax({
      url: '/addItem',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        newItem: newItem,
        list: this.state.selectedList._id,
      }),
      success: (data) => {
        data = JSON.parse(data);
        let newState = this.state.selectedList;
        newState.items = data[0].items;

        this.setState({selectedList: newState});
        if(callback) {
          callback(data[0].items)
        }
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  handleNewList(user, callback) {
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
          // set the drop down to the list

          this.props.update({lists: this.state.userLists});
          if(callback){
            callback();
          }
      },
      err: (err) => {
        console.error(err);
      }
    });
  }

  handleListSelect(e) {
    this.setState({selectedList: this.state.userLists[e.target.value]});
  }

  render() {
    let display;

    if(this.state.selectedList.name === 'new') {
      this.handleNewList(this.props.user, () => {
        $('#list-select').val(this.state.userLists.length -1);
      });
    } else {

      display = this.state.selectedList.name !== null ?
     <ListEntry
      stores={this.props.stores}
      update={this.props.update}
      updateList={this.updateList.bind(this)}
      className='list'
      list={this.state.selectedList}
      createStore={this.props.createStore} />   :
     <div id='warning'>Select a list from the<br/>from drop down menu<br/>Hover over drop down to<br/> get back to this</div>;
    }

    return (
      <div className="text-center">
      <NavBar {...this.props} />
      <br/>
        <select id="list-select" defaultValue="x" onChange={this.handleListSelect}>
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