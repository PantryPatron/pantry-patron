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

    /*
     these two lines of code are presets.
     !!!DO NOT DELETE this unless you want to refactor everything

     basically we are taking advantage of how array only iterate through
     numerical indexes
    */

    this.state.userLists.x = { name: null, items: [] };
    this.state.userLists.new = { name: 'new', items: [] };
    // thank you - I'm sorry for the small technical gotcha
    this.updateThisList = this.updateThisList.bind(this);
    this.handleListSelect = this.handleListSelect.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  componentDidMount() {
    /*
      When the component mounts we are setting an event listner that checks to see if the
      lists dropdown is hovered over for more than 500 ms. This functionality allows for the lists
      data to reset.
    */
    if (this.state.userLists.length <= 0) {
      const localLists = JSON.parse(window.localStorage.getItem('pantrypatron-data')).lists;

      if (localLists.length) {
        localLists.x = { name: null, items: [] };
        localLists.new = { name: 'new', items: [] };
        this.setState({ userLists: localLists });
      }
    }
    $('#list-select').on('mouseover', () => {
      setTimeout(() => {
        if ($('#list-select').is(':hover')) {
          this.setState({ selectedList: this.state.userLists.x });
          $('#list-select').val('x').change();
        }
      }, 500);
    });
  }

  onDeleteClick() {
    this.props.deleteList(this.state.selectedList);
  }

  /*
  updates the lists when changed on the backend then on the front end in
  the success.
  */
  updateList(newItem, callback) {
    $.ajax({
      url: '/addItem',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        newItem,
        list: this.state.selectedList._id,
      }),
      success: (data) => {
        data = JSON.parse(data);
        if (data[0].items === undefined) {
        } else {
          const newState = this.state.selectedList;
          newState.items = data[0].items;
          this.setState({ selectedList: newState });
          if (callback) {
            callback(data[0].items);
          }
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  /*
    grabs the user information for the _id then prompts the user for more informaation
    when the user enters something, ask the backend to do it's magic.
  */
  handleNewList(user, callback) {
    let listName = prompt('What\'s this lists name?');

    while (listName === '') {
      listName = prompt('One cannot create a list with no name');
    }

    if (Object.keys(user).length < 1) {
      user = JSON.parse(localStorage.getItem('pantrypatron-data')).userData;
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
        this.setState({
          userLists: this.state.userLists.concat([JSON.parse(data)]),
          selectedList: JSON.parse(data),
        });

        // !!!!!!!!! DON'T DELETE
        this.state.userLists.x = { name: null, items: [] };
        this.state.userLists.new = { name: 'new', items: [] };
        // unless refactoring

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

  updateThisList(newList) {
    const { userLists } = this.state;
    const newLists = [];

    userLists.forEach((l) => {
      if (l._id === newList._id) {
        newLists.push(newList);
      } else {
        newLists.push(l);
      }
    });
    const stateList = newLists;
    newLists.x = { name: null, items: [] };
    newLists.new = { name: 'new', items: [] };
    this.props.update({ lists: newLists }, () => {
      this.setState({ userLists: stateList, selectedList: newList });
    });
    //= ===================================
  }

  render() {
    let display;

    if (this.state.selectedList.name === 'new') {
      this.handleNewList(this.props.user, () => {
        $('#list-select').val(this.state.userLists.length - 1);
      });
    } else {
      display = this.state.selectedList.name !== null ?
        (<ListEntry
          stores={this.props.stores}
          update={this.props.update}
          updateThisList={this.updateThisList}
          deleteList={this.onDeleteClick}
          updateItem={this.updateList.bind(this)}
          className="list"
          list={this.state.selectedList}
          createStore={this.props.createStore}
        />) :
        <div id="warning">Select a list from the<br />from drop down menu<br />Hover over drop down to<br /> get back to this</div>;
    }

    return (
      <div className="text-center">
        <NavBar {...this.props} />
        <br />
        <select
          data-live-search="true"
          className="form-control dropdown"
          id="list-select"
          defaultValue="x"
          onChange={this.handleListSelect}
        >
          <option value="x" key="x"> Select </option>
          <option value="new" key="new">New list</option>
          {
            this.state.userLists.map((list, index) => <option value={index} key={index}>{list.name}</option>)
          }
        </select>
        <br className="line-break" />
        {display}
      </div>
    );
  }
}

Lists.propTypes = {
  lists: PropTypes.array.isRequired,
  deleteList: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string,
  }),
  stores: PropTypes.array.isRequired,
};

export default Lists;
