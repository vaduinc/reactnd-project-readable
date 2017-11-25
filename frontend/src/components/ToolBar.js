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
                  <div className="w3-col m1 w3-padding-16">
                      <CategorySelect selectedCategory={this.props.selectedCategory} addEmpty={true} changeCategory={this.props.changeCategory} />
                  </div>
                  <div className="w3-col m6 w3-hide-small">
                        {
                          this.props.selectedCategory && (
                            <h3>Filtered by category "{this.props.selectedCategory}".</h3>
                          )
                        }
                  </div>
                  <div className="w3-col m1 w3-right" >
                      <p className="vote-sort-button"><a className="w3-button w3-padding-large w3-white w3-border" onClick={() => this.props.changeSort('voteScore')}>votes</a></p>
                  </div>
                  <div className="w3-col m1 w3-right">
                      <p className="calendar-sort-button"><a className="w3-button w3-padding-large w3-white w3-border" onClick={() => this.props.changeSort('timestamp')}>date</a></p>
                  </div>
              </div>
          </div>
    )
  }
}

export default ToolBar
