import React from 'react';

export default class Category extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      category: ''
    };
  }// end constructor

  handleCategoryChange(e) {
    this.setState({category: e.target.value});
  } //end handleCategoryChange

  handleNewCategory() {
    let newCategory = {
      name: prompt("Enter a new category")
    }
    // uses a callback to create the new category then passes in another callback
    // that sets the state.category of this item
    /*this.props.createCategory(newCategory, function(err, success) {
      if(err) throw err;

      this.setState({category: success.name});
    });*/
    console.log(newCategory);
  }
  render() {
    if(this.state.category === 'new') {
      this.handleNewCategory();
    }
    return(

        <select onChange={this.handleCategoryChange.bind(this)}>
          <option value="" key=""></option>
          <option value="new" key="new">New Category</option>
          {
            /*render options dynamically*/
            this.props.categories.map((category) => {
            return <option value={category.name} key={category.name}>{category.name}</option>
          })
          }
        </select>

    );
  } // end render
};