/*MAYBE DELETE*/
import React from 'react';
import $ from 'jquery';
import Client from '../index.jsx';

class ListItem extends React.Component {
  // delete item
  handleTrashClick() {
    this.props.onTrashClick(this.props.id);
  }

  render() {
    return (
      <div>
        <div>
          <ul>
            <li>
              <b>Item:</b> {this.props.item.name} <br></br>
              {/*<b>Quantity:</b> {this.props.item.quantity} <br></br>
              <b>Price:</b> ${Number(this.props.item.price).toFixed(2)}*/}
            </li>
          </ul>
        </div>

        <div>
          <span onClick={this.props.onEditClick}>
            <a href="#">
              <span className="glyphicon glyphicon-pencil"></span>
            </a>
          </span>
        </div>

        <div className="col-md-2">
          <span onClick={this.handleTrashClick.bind(this)}>
            <a href="#">
              <span className="glyphicon glyphicon-remove"></span>
            </a>
          </span>
        </div>
      </div>
    )
  }
}

export default ListItem;