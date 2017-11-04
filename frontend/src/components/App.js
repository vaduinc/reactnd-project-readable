import React, { Component } from 'react';
import { Route, Link , withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import CategoryList from './CategoryList'
import PostList from './PostList'
import Post from './Post'
import Header from './Header'
import '../App.css'

class App extends Component {

   componentDidMount() {
  //   const url = `${process.env.REACT_APP_BACKEND}/categories`;
  //   console.log('fetching from url', url);
  //   fetch(url, { headers: { 'Authorization': 'whatever-you-want' },
  //                credentials: 'include' } )
  //     .then( (res) => { return(res.text()) })
  //     .then((data) => {
  //       this.setState({backend:data});
  //     });
  
    // getCategories()
    // .then(categories => this.setState({backend:categories}))

    //this.props.getAllCategories()
    
   }

   updateAfterSearch () {

   }


  render() {
    return (
      <div className="w3-content" style={{maxwidth: 800}} >

          <Header /> 

          <Route exact path='/' render={() => (
            <div className="w3-row">
                <div className="open-search">
                   <Link to="/post" >Add Post</Link>
                </div>

                <PostList />
                <CategoryList />
            </div>
          )}/>  
          <Route path='/post' render={({ history }) => (
            <Post 
                reading={false}
                onSavedPost={ (didChange) => {
                  this.updateAfterSave(didChange)
                  history.push('/')
                } }
              />
          )}/>

      </div>
    )
  }
}

export default withRouter(connect()(App))

