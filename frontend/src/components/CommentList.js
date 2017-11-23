import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link  } from 'react-router-dom'
import {fetchComments,deleteComment} from '../actions/commentActions'
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

    onDelete =(commentId) => {
        this.props.deleteComment(commentId)
    }

    render() {

        const { comments } = this.props.comments

        let filteredComment = comments || []
        filteredComment = filteredComment.filter((item) => !item.deleted).sort(this.dynamicSort('-voteScore'))

        return (    

            <div className="w3-col l12 s12">     
                
                { 
                    filteredComment.map( (comment) => (
                    <div key={comment.id} className="w3-card-4 w3-margin w3-black">
                        <div className="w3-container">
                            <span className="w3-opacity">{comment.author}, {(new Date(comment.timestamp)).toDateString()}</span>
                            <p>{comment.body}</p>
                            <div className="w3-row">
                                <div className="w3-col m7 ">
                                    <p className="delete-button">
                                        <button type='button' onClick={()=> this.onDelete(comment.id)} className="w3-button w3-padding-large w3-white w3-border"><b>Delete</b></button>
                                    </p>
                                    <p className='edit-link'>
                                        <Link to={`/commentSave/edit/${comment.id}`} >Edit</Link>
                                    </p>
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

export default connect(mapStateToProps,{fetchComments,deleteComment})(CommentList)