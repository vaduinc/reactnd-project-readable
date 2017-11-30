import React, { Component } from 'react'
import {saveComment,updateComment} from '../actions/commentActions'
import serializeForm from 'form-serialize'
import { connect } from 'react-redux';
import { withRouter , Link} from 'react-router-dom'
import Votes from './Votes'
import AlertContainer from 'react-alert'
import {alertOptions} from '../utils/msgUtil'

class CommentSave extends Component {

    handleSubmit = (e) => {
        e.preventDefault()
        this.msg.show('Saving data...', {
            time: 1000,
            type: 'success'
          })
        const values = serializeForm(e.target, { hash: true })
        if (this.props.action==='add'){
            values.parentId = this.props.postId
            this.props.saveComment(values)
                .then( () => {
                             this.cleanForm()
                             this.props.reloadPost()
                            })
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

        const { action, commentId } = this.props
        const { dataCollection } = this.props.comments

        let currentComment 
        if (action==='edit'){
           currentComment = dataCollection.filter( (item) => item.id===commentId)[0]
        } 
        
        return (    
            <div className="w3-col l12 s12">
                <AlertContainer ref={a => this.msg = a} {...alertOptions} />
                <div className="w3-card-4 w3-margin w3-light-grey">
                    <form onSubmit={this.handleSubmit} ref="form" >
                        <div className="w3-container">
                            <div className="w3-row w3-padding-16">
                                <div className="w3-col m9 s12"> 
                                    <textarea ref="commentBody" name="body" defaultValue={currentComment?currentComment.body:''}  placeholder='join the discussion...' className="w3-input" />
                                </div> 
                                <div className="w3-col m3">
                                    {currentComment && (<h3 className="w3-right">{currentComment.author}</h3> )}
                                    {!currentComment && (<input ref="commentAuthor" name="author" type='text' placeholder='author' className="w3-simple-input  w3-right" />)}
                                </div>          
                            </div>   
                            <div className="w3-row">
                                {!currentComment && (<div className="w3-col m1"><p className='clear-button'><button type="button" className="w3-button w3-padding-large w3-white w3-border" onClick={this.cleanForm.bind(this)} >Clear</button></p></div>)}
                                {currentComment && (<div className="w3-col m1"><p className="return-link"><Link to={`/post/${currentComment.parentId}`} >Return</Link></p></div>)}
                                <div className="w3-col m2">
                                    <p className='save-button'><button type="submit" className="w3-button w3-padding-large w3-white w3-border">Save</button></p>    
                                </div>
                                <div className="w3-col m5 w3-hide-small w3-right">
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