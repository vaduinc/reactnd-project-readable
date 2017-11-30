import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link  } from 'react-router-dom'
import * as actions from '../actions/commentActions'
import Votes from './Votes'
import {dynamicSort} from '../utils/sortUtil'

class CommentList extends Component {

    componentDidMount() {
        this.props.fetchComments(this.props.postId)
    }

    onDelete =(commentId) => {
        this.props.deleteComment(commentId)
        this.props.reloadPost()
    }

    render() {
        const { dataCollection } = this.props.comments

        let filteredComment = dataCollection || []
        filteredComment = filteredComment.filter((item) => !item.deleted).sort(dynamicSort('-voteScore'))

        return (    

            <div className="w3-col l12 s12">     
                
                { 
                    filteredComment.map( (comment) => (
                    <div key={comment.id} className="w3-card-4 w3-margin w3-black">
                        <div className="w3-container">
                            <h3 className="w3-opacity">{comment.author}, {(new Date(comment.timestamp)).toDateString()}</h3>
                            <p>{comment.body}</p>
                            <div className="w3-row">
                                <div className="w3-col m1 ">
                                    <p className="delete-button">
                                        <button type='button' onClick={()=> this.onDelete(comment.id)} className="w3-button w3-padding-large w3-white w3-border"><b>Delete</b></button>
                                    </p>
                                </div>
                                <div className="w3-col m1 ">
                                    <p className='edit-link'>
                                        <Link to={`/commentSave/edit/${comment.id}`} >Edit</Link>
                                    </p>
                                </div>
                                <div className="w3-col m5 w3-hide-small w3-right">
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

export default connect(mapStateToProps,actions)(CommentList)