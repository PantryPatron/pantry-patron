import React from 'react';

class EditableListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editFormOpen = false;
    }
    // bindings

    /*
      DONT THINK WE NEEDS THESE
    */
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
        <div>
          {/**/}
        </div>
      );
    } else {
      return (
        <div></div>
      );
    }
  }
}

export default EditableListItem;