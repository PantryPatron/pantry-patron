import React from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';

import ListEntry from './ListEntry.jsx';
import NavBar from './Navigation.jsx';


class Lists extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userLists: this.props.lists || [],
      selectedList: { name: null, items: [] },
    };

    this.state.userLists.x = { name: null, items: [] };
    this.state.userLists.new = { name: 'new', items: [] };

    this.handleListSelect = this.handleListSelect.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  componentDidMount() {
    const context = this;
    $('#list-select').on('mouseover', () => {
      setTimeout(() => {
        if ($('#list-select').is(':hover')) {
          context.setState({ selectedList: this.state.userLists.x });
          $('#list-select').val('x').change();
        }
      }, 500);
    });
  }

  onDeleteClick() {
    this.props.deleteList(this.state.selectedList);
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
    console.log('This is the user I got', user);
    let listName = prompt('What\'s this lists name?');

    while (listName === '') {
      listName = prompt('One cannot create a list with no name');
    }

    const newList = {
      name: listName,
      user_id: user._id,
    };

    $.ajax({
      url: '/lists/create',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(newList),
      success: (data) => {
        console.log(JSON.parse(data), 'here is the data');

        this.setState({
          userLists: this.state.userLists.concat([JSON.parse(data)]),
          selectedList: JSON.parse(data),
        });

        this.state.userLists.x = { name: null, items: [] };
        this.state.userLists.new = { name: 'new', items: [] };
        // set the drop down to the list

        this.props.update({ lists: this.state.userLists });
        if (callback) {
          callback();
        }
      },
      err: (err) => {
        console.error(err);
      },
    });
  }

  handleListSelect(e) {
    this.setState({ selectedList: this.state.userLists[e.target.value] });
  }

  render() {
    let display;

    if (this.state.selectedList.name === 'new') {
      this.handleNewList(this.props.user, () => {
        $('#list-select').val(this.state.userLists.length - 1);
      });
    } else {
      display = this.state.selectedList.name !== null ?
     <ListEntry
      stores={this.props.stores}
      update={this.props.update}
      deleteList={this.onDeleteClick}
      updateItem={this.updateList.bind(this)}
      className='list'
      list={this.state.selectedList}
      createStore={this.props.createStore} />   :
     <div id='warning'>Select a list from the<br/>from drop down menu<br/>Hover over drop down to<br/> get back to this</div>;
    }

    return (
      <div className="text-center">
      <NavBar {...this.props} />

        <select className="form-control" id="dropdown" data-live-search="true" defaultValue="x" onChange={this.handleListSelect}>
          <option value='x' key='x'> Select </option>
          <option value='new' key='new'>New list</option>
          {
            this.state.userLists.map((list, index) => {
              return ( <option value={index} key={index}>{list.name}</option> )
            })
          }
        </select>

      </div>
    );
  }
}

Lists.propTypes = {
  lists: PropTypes.array.isRequired,
  deleteList: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
  stores: PropTypes.array.isRequired,
};

export default Lists;
