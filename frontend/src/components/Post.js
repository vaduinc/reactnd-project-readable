import React, { Component }  from 'react'
import { connect } from 'react-redux';
import { withRouter , Link} from 'react-router-dom'
import Votes from './Votes'
import CommentList from './CommentList'
import CommentSave from './CommentSave'
import {deletePost,fetchPost} from '../actions/postActions'

class Post extends Component {

    componentDidMount() {
        this.props.fetchPost(this.props.postId)
    }

    onReturn() {
        this.props.onSavedPost()
    }

    onDelete(postId){
        this.props.deletePost(postId)
        this.onReturn()
    }

    render() {
        const { postId } = this.props
        let currentPost = this.props.posts.loadedPost
          
        return (    
            <div className="w3-card-4 w3-margin w3-white">
                { !currentPost && (
                    <h2 className="w3-left">
                        This post is not valid or has been removed. Click the home icon to return.
                        <p className="home-button"><Link to={'/'} >Home</Link></p>  
                    </h2>  
                )}

                { currentPost && (
                    <div>
                        <form onSubmit={this.handleSubmit} >
                            <div className="w3-container">
                                <div className="w3-row">
                                    <div className="w3-col m8 s12">
                                        <input name="id" type='hidden' defaultValue={currentPost?currentPost.id:''} />
                                        <h3><b>{currentPost.title}</b></h3>
                                    </div> 
                                    <div className="w3-col m4 s12">
                                        <h2>{currentPost.category}</h2>
                                    </div>          
                                </div>
                                <div className="w3-row">
                                    <div className="w3-col m12 s12">
                                        <h5>{currentPost.author}, <span className="w3-opacity">{(new Date(currentPost.timestamp)).toDateString()}</span> - {currentPost.commentCount} comments</h5>
                                    </div> 
                                </div>  
                                <div className="w3-row">  
                                    <div className="w3-col m12 s12">
                                        <p>{currentPost.body}</p>
                                    </div>    
                                </div>   
                                <div className="w3-row">
                                    <div className="w3-col m1 s12">
                                            <p className="home-button">
                                                <Link to={'/'} >Home</Link>
                                            </p>    
                                    </div>
                                    <div className="w3-col m1">
                                            <p className="delete-button">
                                                <button type='button' onClick={()=> this.onDelete(currentPost.id)} className="w3-button w3-padding-large w3-white w3-border">Delete</button>
                                            </p>
                                    </div>
                                    <div className="w3-col m1">
                                            <p className='edit-link'>
                                                <Link to={`/postSave/edit/${currentPost.id}`} >Edit</Link>
                                            </p>
                                    </div>
                                    <div className="w3-col m9 w3-hide-small">
                                        <Votes enableChange='true' id={currentPost.id}  voteScore={currentPost.voteScore} voteType='post' />
                                    </div>
                                </div>   
                            </div>

                        </form>

                        <div>
                            <CommentSave action={'add'} postId={postId} />
                        </div>
                        <div>
                            <CommentList postId={postId} />
                        </div>

                    </div>
                )}
            </div>
        )
    }
}

const mapStateToProps = ({ comments, posts, categories }) => ({
    posts
})
 
export default withRouter(connect(mapStateToProps,{deletePost,fetchPost})(Post))