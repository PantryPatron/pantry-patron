import React from 'react';

export default class ListItemEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: props.item,
      qty: 0,
      price: 0.00

    };
  }
  handleQtyChange(e) {
    this.setState({ qty : e.target.value});
  }

  handlePriceChange(e) {
    this.setState({ price : e.target.value});
  }

  render() {
    return (
      <tr>
        <td>
        <input type="text" name="item" value={this.state.item.name} disabled/>
        <input type="number" name="qty" value={this.state.qty} onChange={this.handleQtyChange.bind(this)}/>
        <input type="number" name="price" value={this.state.price} onChange={this.handlePriceChange.bind(this)}/>
        </td>
      </tr>
    );
  }
};
