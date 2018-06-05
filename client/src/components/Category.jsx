import React from 'react';
import $ from 'jquery';

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

    let set = this.setState.bind(this);
    $.ajax({
      type: 'POST',
      url: 'http://localhost:3000/category/create',
      contentType: 'application/json',
      data: JSON.stringify(newCategory),
      success: (data) => {
        console.log('response to category', data)
        // if(res.status === 201) {
        //   set({category: res.responseText.name})
        // }
      },
      error: (err) => {
        console.error(err);
      }
    });
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