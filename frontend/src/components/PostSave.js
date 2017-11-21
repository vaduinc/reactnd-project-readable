import React, { Component } from 'react'
import {savePost,updatePost} from '../actions/postActions'
import serializeForm from 'form-serialize'
import { connect } from 'react-redux';
import { withRouter , Link} from 'react-router-dom';
import CategorySelect from './CategorySelect'


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
                            <div className="w3-col m8 s12">
                                <br/>
                                <button className="w3-button w3-padding-large w3-white w3-border"><b><Link to={action==='add'?'/':`/post/${postId}`} >Cancel</Link></b></button>
                                <button type="submit" className="w3-button w3-padding-large w3-white w3-border"><b>Save</b></button>
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
 
const mapDispatchToProps = (dispatch)  => (
        {
            savePost:   (values) => dispatch(savePost(values)),
            updatePost: (values) => dispatch(updatePost(values))
        }
    )

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostSave))