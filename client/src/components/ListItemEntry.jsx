import React from 'react';
import $ from 'jquery';

import Category from './Category.jsx'
export default class ListItemEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: props.item,
      quantity: props.item.quantity,
      price: props.item.price

    };
    this.typingTimer = 2000;
    this.timeout ;
  }

  updateItemHistory() {
    console.log(this.props.item._id, this.state.item.item_id.name);

    let updatedItem = {
      _id: this.props.item._id,
      name: this.state.item.item_id.name,
      price: this.state.price,
      quantity: this.state.quantity
    }
    console.log(updatedItem);

    // $.ajax({
    //   url: '/updateHistory',
    //   type: 'POST',
    //   data: JSON.stringify(updatedItem),
    //   contentType: 'application/json',
    //   success: (data) => {
    //     console.log(data)
    //   }
    // });
  }

  componentDidUpdate() {
    // timer that will update when after 2 seconds of no typing
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => (this.updateItemHistory()), this.typingTimer)
  }

  handleQtyChange(e) {
    this.setState({ quantity : e.target.value});
  }

  handlePriceChange(e) {
    this.setState({ price : e.target.value});
  }

  handleNameChange(e) {
    this.setState({item: { item_id: { name: e.target.value}}})
  }

  render() {
    // console.log('item entry : ', this.state)
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
