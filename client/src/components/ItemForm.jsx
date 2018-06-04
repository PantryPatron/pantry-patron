import React from 'react';

class ItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      quantity: 'quantity',
      price: 'price'
    }
    // bindings
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleQuantChange = this.handleQuantChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handle value changes
  handleNameChange(e) {
    // console.log(e.target.value, 'was entered')
    this.setState({name: e.target.value});
  }

  handleQuantChange(e) {
    // console.log('new qty', e.target.value);
    this.setState({quantity: e.target.value});
  }

  handlePriceChange(e) {
    // console.log('new price', e.target.value);
    this.setState({price: Number(e.target.value).toFixed(2)});
  }

  // handle submit of edit
  handleSubmit() {
    this.props.onFormSubmit({
      // id: this.props.item.id,
      // name: this.state.name,
      // quantity: this.state.quantity,
      // price: this.state.price
    });
  }

  render() {
    return(
      <div>
        <form>
          <input type="text" placeholder="Enter an item..." name="item" value={this.state.name} onChange={this.handleNameChange}/>
          <input type="number" placeholder="Quantity" name="quantity" value={this.state.quantity} onChange={this.handleQuantChange}/>
          <input type="number" placeholder="Price" name="price" step="any" value={this.state.price} onChange={this.handlePriceChange}/>
        </form>
        <div>
          <button type="button" class="btn btn-default btn-sm">
            <span class="glyphicon glyphicon-plus"></span> Add Item to Cart
          </button>
        </div>
      </div>
    );
  }
}

export default ItemForm;



/*
+-----------+  +---+  +-------+
| ITEM NAME |  |QTY|  | PRICE |
+-----------+  +---+  +-------+
*/