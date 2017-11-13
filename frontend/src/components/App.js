import React, { Component } from 'react';
import { Route, Link , withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import CategoryList from './CategoryList'
import PostList from './PostList'
import Post from './Post'
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

   updateAfterSave (didChange) {
      console.log('values were changed ; ' + didChange)
      // TODO add a message box notifying about SAVED
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
            <div className="w3-row">
                
                <div className="w3-col l6 s12">     
                    <div className="w3-card-4 w3-margin w3-white">
                        <div className="w3-container">
                            <div className="w3-row">
                                <div className="w3-col m2 s12">
                                    <p className="open-search"><Link to="/post" >Add Post</Link></p>
                                </div>
                                <div className="w3-col m4 s12">
                                  <br/>
                                  <button onClick={() => this.changeSort('voteScore')}  className="w3-button w3-padding-large w3-black w3-border"><b>By Votes</b></button>
                                  <button onClick={() => this.changeSort('timestamp')}  className="w3-button w3-padding-large w3-black w3-border"><b>By Date</b></button>
                                </div>
                                <div className="w3-col m6 w3-hide-small">
                                     {
                                        this.state.selectedCategory && (
                                          <div className='showing-contacts' > 
                                              <span>Now filtering by category "{this.state.selectedCategory}" </span>
                                              <button onClick={()=>this.changeCategory()}>remove filter</button>
                                          </div>
                                        )
                                      }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>   

                <PostList sorted={this.state.sortBy} filterCategory={this.state.selectedCategory}/>
                <CategoryList onChangeCategory={this.changeCategory} />
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

