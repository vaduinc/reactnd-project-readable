import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux'
import CategoryList from './CategoryList'
import PostList from './PostList'
import Header from './Header'

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

  render() {
    return (
      <div className="w3-content" style={{maxwidth: 1400}} >

        <Header /> 

        <div className="w3-row">
            <PostList />
            <CategoryList />
        </div><br/>

      </div>
    )
  }
}

export default connect()(App)
