import React from 'react';

class EditableListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editFormOpen = false;
    }
    // bindings
    this.handleEdit = this.handleEdit.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleFormClose = this.handleFormClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.closeForm = this.closeForm.bind(this);
    this.openForm = this.openForm.bind(this);
  }

  handleEdit() {
    this.setState({editFormOpen: true});
  }

  handleEditClick() {
    this.openForm();
  }

  handleFormClose() {
    this.closeForm();
  }

  handleSubmit(item) {
    this.props.onFormSubmit(item);
    this.closeForm();
  }

  closeForm() {
    this.setState({editFormOpen: false});
  }

  openForm() {
    this.setState({editFormOpen: true});
  }

  render() {
    if (this.state.editFormOpen) {
      return (
        <ItemForm
          item={this.props.item}
          onFormSubmit={this.handleSubmit}
          onFormClose={this.handleFormClose}
        />
      );
    } else {
      return (
       <ListItem
          item={this.props.item}
          id={this.props.item.id}
          onEditClick={this.handleEditClick}
          onTrashClick={this.props.onTrashClick}
        />
      );
    }
  }
}

export default EditableListItem;