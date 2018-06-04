import React from 'react';

import ListItemEntry from './ListItemEntry.jsx';
import ItemForm from './ItemForm.jsx';

class ListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      store: '',
      total_price: 0.00,
      items: this.props.list.items
    }
    console.log('2', this.props.stores)
  } // end constructor

  handleStoreChange(e) {
    this.setState({store: e.target.value});
  }
  render() {
      return (
        <div>
          <h3>{this.props.list.name}</h3>
          <br/>
          <select className="store-selection" onChange={this.handleStoreChange.bind(this)}>
            <option key="new">New store</option>
            {this.props.stores.map( (store) => {
              return <option key={store._id} >{store}</option>
            })}
          </select>
          <br/>
          <br/>
          {
            // console.log('these are the items', this.state.items)
            this.state.items.map((item) => {
              return <ListItemEntry key={item._id} item={item}/>
            })
          }
          <br/>
          <ItemForm />
        </div>
      );
  } // end render
} // end component

export default ListEntry;