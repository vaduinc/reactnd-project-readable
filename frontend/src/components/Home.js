import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PostList from './PostList'
import CategoryList from './CategoryList'
import ToolBar from './ToolBar'
import '../App.css'

class Home extends Component {

    constructor(props) {
      super(props)
      this.state = {
        sortBy: 'voteScore'
      }
    }

   changeSort = (sorted) => {
      let newSort = '-'+sorted
      if (this.state.sortBy.indexOf(sorted) !== -1){
        newSort = (this.state.sortBy[0] === '-'?'':'-') + sorted
      }
      this.setState({
        sortBy : newSort
      })
   }


  render() {

    return (
      <div>
          <div className="w3-card-4 w3-margin w3-white">
              <ToolBar selectedCategory={this.props.selCategory} changeSort={this.changeSort}  />
              <CategoryList />
              <PostList sorted={this.state.sortBy} filterCategory={this.props.selCategory?this.props.selCategory:null}/>
          </div>
      </div>
    )
  }
}

export default withRouter(connect()(Home))

