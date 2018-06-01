import React from 'react';

class ItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Apples' || '',
      quantity: 5 || 0,
      price: 0.50 || 0
    }
    // bindings
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleQuantChange = this.handleQuantChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      // id: this.props.item.id,
      // name: this.state.name,
      // quantity: this.state.quantity,
      // price: this.state.price
    });
  }

  render() {
    <div>
      <h4>Edit/Create Item</h4>

      <div className='row'>
        <div className='column'>
          <label>Item Name</label>
          <input
            type='text'
            value={this.state.name}
            onChange={this.handleNameChange}
          />
        </div>

        <div className='column'>
          <label>Quantity</label>
          <input
            type='number'
            value={this.state.quantity}
            onChange={this.handleQuantChange}
          />
        </div>

        <div className='column'>
          <label>Price</label>

          <input
            type='number'
            value={this.state.price}
            onChange={this.handlePriceChange}
          />
        </div>
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