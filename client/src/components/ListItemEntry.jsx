import React from 'react';
import Category from './Category.jsx'
export default class ListItemEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: props.item,
      quantity: 0,
      price: 0.00

    };
    this.typingTimer = 2000;
    this.timeout ;
  }

  componentDidUpdate() {
    // timer that will update when after 2 seconds of no typing
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => ('done typing'), this.typingTimer)
  }
  handleQtyChange(e) {
    this.setState({ qty : e.target.value});
  }

  handlePriceChange(e) {
    this.setState({ price : e.target.value});
  }

  handleNameChange(e) {
    this.setState({item: { name: e.target.value}})
  }

  render() {
    var cats = [{name: 'food'}, {name: 'self-care'}];
    return (
      <tr>
        <td>
        <input type="text" name="item" value={this.state.item.item_id.name} onChange={this.handleNameChange.bind(this)}/>
        <input type="number" name="quantity" value={this.state.quantity} onChange={this.handleQtyChange.bind(this)} step="any"/>
        <input type="number" name="price" value={this.state.price} onChange={this.handlePriceChange.bind(this)} step="any"/>
        <Category categories={cats || this.props.categories}/>
        </td>
      </tr>
    );
  }
};
