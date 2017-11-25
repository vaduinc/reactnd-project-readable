import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import CategoryList from './CategoryList'
import PostList from './PostList'
import Post from './Post'
import PostSave from './PostSave'
import CommentSave from './CommentSave'
import ToolBar from './ToolBar'
import Header from './Header'
import '../App.css'

class App extends Component {

    constructor(props) {
      super(props)
      this.state = {
        selectedCategory: undefined,
        sortBy: 'voteScore'
      }
    }

   changeCategory = (newValue) => {
      this.setState({
        selectedCategory : newValue
      })
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
      <div className="w3-content" style={{maxwidth: 800}} >

          <Header /> 

          <Route exact path='/' render={() => (
              <div className="w3-card-4 w3-margin w3-white">
                <ToolBar selectedCategory={this.state.selectedCategory} changeSort={this.changeSort} changeCategory={this.changeCategory} />
                <CategoryList onChangeCategory={this.changeCategory} />
                <PostList sorted={this.state.sortBy} filterCategory={this.state.selectedCategory}/>
              </div>
          )}/>  
          <Route path='/post/:postId?' render={({ history }) => (
            <Post onSavedPost={ () => {
              history.push('/')
            } } />
          )}/>
          <Route path='/postSave/:action/:postId?' render={({ history }) => (
            <PostSave  action='edit' />
          )}/>
          <Route path='/commentSave/:action/:commentId?' render={(props) => (
            <CommentSave 
                action='edit'
                commentId={props.match.params.commentId}
              />
          )}/>
      </div>
    )
  }
}

export default withRouter(connect()(App))

