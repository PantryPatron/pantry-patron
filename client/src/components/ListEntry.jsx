import React from 'react';

import ListItemEntry from './ListItemEntry.jsx';
class ListEntry extends React.Component {
  constructor(props) {
    super(props);
  } // end constructor

  render() {
      return (
        <div>
          <h3>{this.props.list.name}</h3>
          <br/>
          <tr>
            <th>Item</th>
            <th>Qty</th>
            <th>Price</th>
          </tr>
          {
            // console.log('these are the items', this.state.items)
            this.props.list.items.map((item) => {
              console.log(item);
              return <ListItemEntry key={item._id} item={item}/>
            })
          }
        </div>
      );
  } // end render
} // end component

export default ListEntry;