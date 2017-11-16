import React, { Component } from 'react'
import {savePost,updatePost} from '../actions/postActions'
import serializeForm from 'form-serialize'
import { connect } from 'react-redux';
import { withRouter , Link} from 'react-router-dom';
import CategorySelect from './CategorySelect'

class Post extends Component {

    handleSubmit = (e) => {
        console.log(e)
        e.preventDefault()
        const values = serializeForm(e.target, { hash: true })
        console.log(this.props.match.params.action)
        if (this.props.match.params.action==='add'){
            this.props.savePost(values)
            this.onReturn(true)
        }else if (this.props.match.params.action==='edit'){
            this.props.updatePost(values)
        }    
    }

    onReturn = (didChange) => {
        console.log(didChange)
        this.props.onSavedPost(didChange)
    }

    render() {

        const { action, postId } = this.props.match.params
        const { posts } = this.props.posts

        let currentPost
        if (action!=='add'){
            currentPost = posts.filter( (item) => item.id===postId)[0]
        }
        
        return (    
            <div className="w3-card-4 w3-margin w3-white">
                <form onSubmit={this.handleSubmit} >
                    <div className="w3-container">
                        <div className="w3-row">
                            <div className="w3-col m8 s12">
                                <input name="id" type='hidden' defaultValue={currentPost?currentPost.id:''} />
                                {action==='read'?<h3><b>{currentPost.title}</b></h3>
                                :<input name="title" type='text' defaultValue={currentPost?currentPost.title:''} placeholder='post title' className="w3-simple-input" />}
                            </div> 
                            <div className="w3-col m4 s12">
                                {action==='read'?<b>{currentPost.category}</b>:<CategorySelect />}
                            </div>          
                        </div>            
                        {action==='read'?<h5>{currentPost.author}, <span className="w3-opacity">{(new Date(currentPost.timestamp)).toDateString()}</span></h5>
                        :<input name="author" type='text' defaultValue={currentPost?currentPost.author:''} placeholder='author' className="w3-simple-input" /> }
                    </div>

                    <div className="w3-container">
                        {action==='read'?<p>{currentPost.body}</p>
                        :<textarea name="body" defaultValue={currentPost?currentPost.body:''}  placeholder='body content' className="w3-simple-input" /> }
                        <div className="w3-row">
                            <div className="w3-col m8 s12">
                                <br/>
                                <button type='button' onClick={()=> this.onReturn(false)} className="w3-button w3-padding-large w3-white w3-border"><b>Cancel</b></button>
                                {action!=='read'?<button className="w3-button w3-padding-large w3-white w3-border"><b>Save</b></button>
                                :<button className="w3-button w3-padding-large w3-white w3-border"><b><Link to={`/post/edit/${currentPost.id}`} >Edit</Link></b></button>}
                            </div>
                            <div className="w3-col m4 w3-hide-small">
                                <p><span className="w3-padding-large w3-right"><b>Votes  </b> <span className="w3-tag">0</span></span></p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }

}

const mapStateToProps = ({ posts, categories }) => ({
    posts
})
 
export default withRouter(connect(mapStateToProps, { savePost,updatePost })(Post))