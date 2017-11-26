import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import CategorySelect from './CategorySelect'

class ToolBar extends Component {

  render() {
    return (
          <div className="w3-container">
              <div className="w3-row">
                  <div className="w3-col m1 s12">
                      <p className="new-link"><Link to="/postSave/add" >Add Post</Link></p>
                  </div>
                  
                  <div className="w3-col m1" >
                      <p className="vote-sort-button"><a className="w3-button w3-padding-large w3-white w3-border" onClick={() => this.props.changeSort('voteScore')}>votes</a></p>
                  </div>
                  <div className="w3-col m2">
                      <p className="calendar-sort-button"><a className="w3-button w3-padding-large w3-white w3-border" onClick={() => this.props.changeSort('timestamp')}>date</a></p>
                  </div>
                  <div className="w3-col m8 w3-hide-small w1-right">
                        {
                          this.props.selectedCategory && (
                            <h3>Filtered by category "{this.props.selectedCategory}". <Link to={`/`} >click to remove filter</Link></h3>
                          )
                        }
                  </div>
              </div>
          </div>
    )
  }
}

export default ToolBar

