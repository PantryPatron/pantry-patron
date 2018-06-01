import React from 'react';

class ItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'susance',
      quantity: 21,
      price: 12
    }
    // bindings
  }

  // handle value changes
  handleNameChange(e) {
    this.setState({name: e.target.value});
  }

  handleQuantChange(e) {
    this.setState({quantity: e.target.value});
  }

  handlePriceChange(e) {
    this.setState({price: e.target.value});
  }

  // handle submit of edit
  handleSubmit() {
    this.props.onFormSubmit({
      // id
      // name
      // quantity
      // price
    });
  }

  render() {
    <div>
      <h4>Edit/Create Item</h4>

      <div className='field'>
        <label>Item Name</label>
        <input
          type='text'
          value={this.state.name}
          onChange={this.handleNameChange}
        />
      </div>

      <div className='field'>
        <label>Quantity</label>
        <input
          type='number'
          value={this.state.quantity}
          onChange={this.handleQuantChange}
        />
      </div>

      <div className='field'>
        <label>Price</label>
        <input
          type='number'
          value={this.state.price}
          onChange={this.handlePriceChange}
        />
      </div>

      <div>
        <button onClick={this.handleSubmit}>Submit Item</button>
        <button onClick={this.props.onFormClose}>Cancel</button>
      </div>
    </div>
  }
}

export default ItemForm;



/*
               +------------------+
   ITEM NAME |                  |
             +------------------+

             +------------------+
    QUANTITY |                  |
             +------------------+

             +------------------+
       PRICE |                  |
             +------------------+

              VS

+-----------+  +---+  +-------+
| ITEM NAME |  |QTY|  | PRICE |
+-----------+  +---+  +-------+

*/