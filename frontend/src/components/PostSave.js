import React, { Component } from 'react'
import {savePost,updatePost} from '../actions/postActions'
import serializeForm from 'form-serialize'
import { connect } from 'react-redux';
import { withRouter , Link} from 'react-router-dom';
import CategorySelect from './CategorySelect'
import Votes from './Votes'


class PostSave extends Component {

    handleSubmit = (e) => {
        //console.log(e)
        e.preventDefault()
        const values = serializeForm(e.target, { hash: true })
        // console.log(this.props.match.params.action)
        // console.log(values)
        if (this.props.match.params.action==='add'){
            this.props.savePost(values)
                .then( () => this.goPostEdit(values.id))
        }else if (this.props.match.params.action==='edit'){
            values.id = this.props.match.params.postId
            this.props.updatePost(values)
        }    
    }

    goPostEdit(id) {
        //console.log('THIS IS AN ID ' + id)
        this.props.history.push(`/postSave/edit/${id}`)
      }

    onReturn = (didChange) => {
        console.log(didChange)
        //this.props.onSavedPost(didChange)
    }

    render() {

        const { action, postId } = this.props.match.params
        const { posts } = this.props.posts

        let currentPost 
        if (action==='edit'){
           currentPost = posts.filter( (item) => item.id===postId)[0]
        } 
        
        return (    
            <div className="w3-card-4 w3-margin w3-white">
                <form onSubmit={this.handleSubmit} >
                    <div className="w3-container">
                        <div className="w3-row">
                            <div className="w3-col m8 s12"> - {postId} -
                                <input name="title" type='text' defaultValue={currentPost?currentPost.title:''} placeholder='post title' className="w3-simple-input" />
                            </div> 
                            <div className="w3-col m4 s12">
                                <CategorySelect />
                            </div>          
                        </div>            
                        <input name="author" type='text' defaultValue={currentPost?currentPost.author:''} placeholder='author' className="w3-simple-input" />
                    </div>

                    <div className="w3-container">
                        <textarea name="body" defaultValue={currentPost?currentPost.body:''}  placeholder='body content' className="w3-simple-input" />
                        <div className="w3-row">
                            <div className="w3-col m7 s12">
                                <p className="return-link">
                                    <Link to={action==='add'?'/':`/post/${postId}`} >Return</Link>
                                </p>
                                <p className="save">    
                                    <button type="submit" className="w3-button w3-padding-large w3-white w3-border">Save</button>
                                </p>
                            </div>
                            <div className="w3-col m5 w3-hide-small">
                                <Votes enableChange={false} postId={currentPost?currentPost.id:0}  voteScore={currentPost?currentPost.voteScore:0}/>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }

}

const mapStateToProps = ({ comments, posts, categories }) => ({
    posts
})
 
const mapDispatchToProps = (dispatch)  => (
        {
            savePost:   (values) => dispatch(savePost(values)),
            updatePost: (values) => dispatch(updatePost(values))
        }
    )

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostSave))