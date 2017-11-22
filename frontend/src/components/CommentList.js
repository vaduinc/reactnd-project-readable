import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link  } from 'react-router-dom'
import {fetchComments} from '../actions/commentActions'
import Votes from './Votes'

class CommentList extends Component {

    componentDidMount() {
        this.props.fetchComments(this.props.postId)
    }

    /**
     * https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value-in-javascript
     * @param {*} property 
     */
    dynamicSort(property) {
        var sortOrder = 1;
        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a,b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }

    render() {

        const { comments } = this.props.comments

        let filteredComment = comments || []
        filteredComment.sort(this.dynamicSort('-voteScore'))

        return (    

            <div className="w3-col l12 s12">     
                
                { 
                    filteredComment.map( (comment) => (
                    <div key={comment.id} className="w3-card-4 w3-margin w3-light-grey">
                        <div className="w3-container">
                            <p>{comment.body}</p>
                            <span className="w3-opacity">{(new Date(comment.timestamp)).toDateString()}</span>
                            <div className="w3-row">
                                <div className="w3-col m7 ">
                                    <p><button className="w3-button w3-padding-large w3-white w3-border"><b><Link to={`/comment/${comment.id}`} >READ MORE »</Link></b></button></p>
                                </div>
                                <div className="w3-col m5 w3-hide-small">
                                    <Votes enableChange='true' id={comment.id}  voteScore={comment.voteScore} voteType='comment' />
                                </div>
                            </div>
                        </div>
                    </div>
                    ))    
                } 
            </div>    
        )
    }

}

const mapStateToProps = ({ comments, posts, categories }) => ({
    comments
})

export default connect(mapStateToProps,{fetchComments})(CommentList)