import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link  } from 'react-router-dom'
import {fetchPosts,sendVote,deletePost} from '../actions/postActions'
import Votes from './Votes'
import {dynamicSort} from '../utils/sortUtil'

class PostList extends Component {

    componentDidMount() {
        this.props.fetchPosts()
    }

    onDelete =(postId) => {
        this.props.deletePost(postId)
    }

    render() {

        const { dataCollection } = this.props.posts

        let filteredPost = dataCollection || []
        if (this.props.filterCategory){
            filteredPost = filteredPost.filter((item) => item.category===this.props.filterCategory)
        }

        filteredPost.sort(dynamicSort(this.props.sorted))

        return (    

            <div className="w3-col l10">     
                
                { 
                    filteredPost.map( (post) => (
                    <div key={post.id} className="w3-card-4 w3-margin w3-white">
                        <div className="w3-container">
                            <h3><b>{post.title}</b> ({post.category})</h3>
                            <h5>{post.author}, <span className="w3-opacity">{(new Date(post.timestamp)).toDateString()}</span> - {post.commentCount} comments</h5>
                        </div>

                        <div className="w3-container">
                            <p>{post.body}</p>
                            <div className="w3-row">
                                <div className="w3-col m1 s9">
                                    <p className="more-link"><Link to={`/${post.category}/${post.id}`} >... more</Link></p>
                                </div>
                                <div className="w3-col m1">
                                    <p className="delete-button">
                                        <button type='button' onClick={()=> this.onDelete(post.id)} className="w3-button w3-padding-large w3-white w3-border"><b>Delete</b></button>
                                    </p>
                                </div>
                                <div className="w3-col m1">
                                    <p className='edit-link'>
                                        <Link to={`/postSave/edit/${post.id}`} >Edit</Link>
                                    </p>
                                </div>
                                <div className="w3-col m9 w3-hide-small">
                                    <Votes enableChange='true' id={post.id}  voteScore={post.voteScore} voteType='post' />
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
    posts
})

export default connect(mapStateToProps,{fetchPosts,sendVote,deletePost})(PostList)