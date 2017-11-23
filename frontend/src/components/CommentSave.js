import React, { Component } from 'react'
import {saveComment,updateComment} from '../actions/commentActions'
import serializeForm from 'form-serialize'
import { connect } from 'react-redux';
import { withRouter , Link} from 'react-router-dom'
import Votes from './Votes'

class CommentSave extends Component {

    handleSubmit = (e) => {
        e.preventDefault()
        const values = serializeForm(e.target, { hash: true })
        console.log(this.props.action)
        if (this.props.action==='add'){
            values.parentId = this.props.postId
            this.props.saveComment(values)
                .then( () => this.cleanForm())
        }else if (this.props.action==='edit'){
            values.id = this.props.commentId
            this.props.updateComment(values)
        }    
    }

    cleanForm() {
        this.refs.commentAuthor.value =""
        this.refs.commentBody.value =""
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
                <div className="w3-card-4 w3-margin w3-light-grey">
                    <form onSubmit={this.handleSubmit} ref="form" >
                        <div className="w3-container">
                            <div className="w3-row w3-padding-16">
                                <div className="w3-col m8 s12"> 
                                    <textarea ref="commentBody" name="body" defaultValue={currentComment?currentComment.body:''}  placeholder='join the discussion...' className="w3-simple-input" />
                                </div> 
                                <div className="w3-col m4 s12">
                                    {currentComment && (<label>{currentComment.author}</label> )}
                                    {!currentComment && (<input ref="commentAuthor" name="author" type='text' placeholder='author' className="w3-simple-input" />)}
                                </div>          
                            </div>   
                            <div className="w3-row">
                                <div className="w3-col m7 s12">
                                    <p>
                                        {currentComment && (<button className="w3-button w3-padding-large w3-white w3-border"><b><Link to={`/post/${currentComment.parentId}`} >Return</Link></b></button>)}
                                        {!currentComment && (<button type="button" className="w3-button w3-padding-large w3-white w3-border" onClick={this.cleanForm.bind(this)} ><b>Clear</b></button>)}
                                        <button type="submit" className="w3-button w3-padding-large w3-white w3-border"><b>Save</b></button>
                                    </p>    
                                </div>
                                <div className="w3-col m5 w3-hide-small">
                                    {currentComment && (<Votes enableChange={false} id={currentComment.id}  voteScore={currentComment.voteScore} voteType='comment' />)}
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