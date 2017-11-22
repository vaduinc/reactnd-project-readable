import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter , Link} from 'react-router-dom';
import Votes from './Votes'
import CommentList from './CommentList'
import CommentSave from './CommentSave'

class Post extends Component {

    onReturn = (didChange) => {
        console.log(didChange)
        this.props.onSavedPost(didChange)
    }

    render() {

        const { postId } = this.props.match.params
        const { posts } = this.props.posts
        
        let currentPost = posts.filter( (item) => item.id===postId)[0]
               
        return (    
            <div className="w3-card-4 w3-margin w3-white">
                <form onSubmit={this.handleSubmit} >
                    <div className="w3-container">
                        <div className="w3-row">
                            <div className="w3-col m8 s12">
                                <input name="id" type='hidden' defaultValue={currentPost?currentPost.id:''} />
                                <h3><b>{currentPost.title}</b></h3>
                            </div> 
                            <div className="w3-col m4 s12">
                                <b>{currentPost.category}</b>
                            </div>          
                        </div>            
                        <h5>{currentPost.author}, <span className="w3-opacity">{(new Date(currentPost.timestamp)).toDateString()}</span></h5>
                    </div>

                    <div className="w3-container">
                        <p>{currentPost.body}</p>
                        <div className="w3-row">
                            <div className="w3-col m8 s12">
                                <br/>
                                <button type='button' onClick={()=> this.onReturn(false)} className="w3-button w3-padding-large w3-white w3-border"><b>Return</b></button>
                                <button className="w3-button w3-padding-large w3-white w3-border"><b><Link to={`/postSave/edit/${currentPost.id}`} >Edit</Link></b></button>
                            </div>
                            <div className="w3-col m4 w3-hide-small">
                                <Votes enableChange='true' id={currentPost.id}  voteScore={currentPost.voteScore} voteType='post' />
                            </div>
                        </div>
                    </div>
                </form>

                <div>
                    <CommentSave action={'add'} postId={currentPost.id} />
                </div>
                <div>
                    <CommentList postId={currentPost.id} />
                </div>
            </div>
        )
    }

}

const mapStateToProps = ({ comments, posts, categories }) => ({
    posts
})
 
export default withRouter(connect(mapStateToProps)(Post))