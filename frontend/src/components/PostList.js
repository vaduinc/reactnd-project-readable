import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link  } from 'react-router-dom'
import {fetchPosts,sendVote} from '../actions/postActions'
import Votes from './Votes'

class PostList extends Component {

    componentDidMount() {
        this.props.fetchPosts()
    }

    /**
     * https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value-in-javascript
     * @param {*} property 
     */
    dynamicSort(property) {
        var sortOrder = 1;
        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a,b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }

    render() {

        const { posts } = this.props.posts

        let filteredPost = posts || []
        if (this.props.filterCategory){
            filteredPost = filteredPost.filter((item) => item.category===this.props.filterCategory)
        }

        filteredPost.sort(this.dynamicSort(this.props.sorted))

        return (    

            <div className="w3-col l10 s9">     
                
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
                                <div className="w3-col m5 s9">
                                    <p className="more-link"><Link to={`/post/${post.id}`} >... more</Link></p>
                                </div>
                                <div className="w3-col m7 w3-hide-small">
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

export default connect(mapStateToProps,{fetchPosts,sendVote})(PostList)