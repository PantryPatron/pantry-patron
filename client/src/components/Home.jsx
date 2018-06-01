import React from 'react';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lists: props.lists || [],
      selected: props.selected || {name: 'slkjsi', total_price: 12},
      onEdit: props.onEdit,
    };
  }

  render() {
    return (
      <div>
        <div>
          <div>
            <p>Chat here</p>
          </div>
          <div>
            <p>Verbal Stats Here</p>
          </div>
        </div>
        <div>
          <h1>Grocery Lists</h1>
          <select>
            {
              this.state.lists.map((list, index) => {
                return <option value={list.name} key={index}>{list.name}</option>;
              })
            }
          </select>
          <div>
            <p>Grocery List {this.state.selected.name} totals ${this.state.selected.total_price}</p>
            {
              this.state.selected.items.map((item, index) => {
                return <p>{item.name}</p>
              })
            }
            <input type="button" value="Edit" onClick={this.state.onEdit}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;