import React, { Component } from 'react'
import {savePost} from '../actions/postActions'
import serializeForm from 'form-serialize'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CategorySelect from './CategorySelect'

class Post extends Component {

    constructor(props) {
        super(props)
        this.state = {
          actionType: undefined
        }
    }

    componentDidMount() {
        this.setState({
            actionType : this.props.match.params.action
          })
    }

    handleSubmit = (e) => {
        console.log(e)
        e.preventDefault()
        const values = serializeForm(e.target, { hash: true })
        this.props.savePost(values)
        this.onReturn(true)
    }

    onReturn = (didChange) => {
        console.log(didChange)
        this.props.onSavedPost(didChange)
    }

    onNewAction = (newAction) => {
        console.log(newAction)
        this.setState({
            actionType : newAction
          })
    }

    render() {

        const { postId } = this.props.match.params
        const { posts } = this.props.posts

        let action = this.state.actionType
        let currentPost
        if (action!=='add'){
            currentPost = posts.filter( (item) => item.id===postId)[0]
        }
        // console.log(currentPost)
        // console.log(action)
        // console.log(this.state.actionType)
        return (    
            <div className="w3-card-4 w3-margin w3-white">
                <form onSubmit={this.handleSubmit} >
                    <div className="w3-container">
                        <div className="w3-row">
                            <div className="w3-col m8 s12">
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
                                :<b/>}
                            </div>
                            <div className="w3-col m4 w3-hide-small">
                                <p><span className="w3-padding-large w3-right"><b>Votes  </b> <span className="w3-tag">0</span></span></p>
                            </div>
                        </div>
                    </div>
                </form>
                {action==='read'?<button type='button' onClick={()=> this.onNewAction('edit')} className="w3-button w3-padding-large w3-white w3-border"><b>Edit</b></button>
                                :<b/>}
            </div>
        )
    }

}

const mapStateToProps = ({ posts, categories }) => ({
    posts
})
 
export default withRouter(connect(mapStateToProps, { savePost })(Post))