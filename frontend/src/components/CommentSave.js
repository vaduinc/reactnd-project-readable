import React, { Component } from 'react'
import {saveComment,updateComment} from '../actions/commentActions'
import serializeForm from 'form-serialize'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class CommentSave extends Component {

    handleSubmit = (e) => {
        //console.log(e)
        e.preventDefault()
        const values = serializeForm(e.target, { hash: true })
        console.log(this.props.action)
        values.parentId = this.props.postId
        if (this.props.action==='add'){
            this.props.saveComment(values)
                .then( () => this.cleanForm())
        }else if (this.props.action==='edit'){
            values.id = this.props.commentId
            this.props.updateComment(values)
        }    
    }

    cleanForm() {
        //console.log('THIS IS AN ID ' + id)
        //this.props.history.push(`/CommentSave/edit/${id}`)
        // TODO clean form here
      }

    onReturn = (didChange) => {
        console.log(didChange)
        //this.props.onSavedPost(didChange)
    }

    render() {

        const { action, postId, commentId } = this.props
        const { comments } = this.props.comments

        let currentComment 
        if (action==='edit'){
           currentComment = comments.filter( (item) => item.id===commentId)[0]
        } 
        
        return (    
            <div className="w3-col l12 s12">
                <div className="w3-card-4 w3-margin w3-white">
                    <form onSubmit={this.handleSubmit} >
                        <div className="w3-container">
                            <div className="w3-row">
                                <div className="w3-col m8 s12"> 
                                    - {commentId} -
                                </div> 
                                <div className="w3-col m4 s12">
                                    - {postId} - {action} -
                                </div>          
                            </div>            
                            <input name="author" type='text' defaultValue={currentComment?currentComment.author:''} placeholder='author' className="w3-simple-input" />
                        </div>

                        <div className="w3-container">
                            <textarea name="body" defaultValue={currentComment?currentComment.body:''}  placeholder='comment' className="w3-simple-input" />
                            <div className="w3-row">
                                <div className="w3-col m8 s12">
                                    <br/>
                                    <button className="w3-button w3-padding-large w3-white w3-border"><b>Clear</b></button>
                                    <button type="submit" className="w3-button w3-padding-large w3-white w3-border"><b>Save</b></button>
                                </div>
                                <div className="w3-col m4 w3-hide-small">
                                    
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

}

const mapStateToProps = ({ comments, posts, categories }) => ({
    comments
})
 
const mapDispatchToProps = (dispatch)  => (
        {
            saveComment:   (values) => dispatch(saveComment(values)),
            updateComment: (values) => dispatch(updateComment(values))
        }
    )

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentSave))