import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link  } from 'react-router-dom'
import {fetchPosts,sendVote,UP_VOTE_POST,DOWN_VOTE_POST} from '../actions/postActions'

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

    onVote = (postId,type) => {
        console.log(`This id ${postId} type ${type}`)
        this.props.sendVote(postId,type)
    }


    render() {

        const { posts } = this.props.posts

        console.log(posts)
        let filteredPost = posts || []
        console.log(filteredPost)
        if (this.props.filterCategory){
            filteredPost = filteredPost.filter((item) => item.category===this.props.filterCategory)
        }

        filteredPost.sort(this.dynamicSort(this.props.sorted))

        return (    

            <div className="w3-col l6 s12">     
                
                { 
                    filteredPost.map( (post) => (
                    <div key={post.id} className="w3-card-4 w3-margin w3-white">
                        <div className="w3-container">
                            <h3><b>{post.title}</b> ({post.category})</h3>
                            <h5>{post.author}, <span className="w3-opacity">{(new Date(post.timestamp)).toDateString()}</span></h5>
                        </div>

                        <div className="w3-container">
                            <p>{post.body}</p>
                            <div className="w3-row">
                                <div className="w3-col m8 s12">
                                    <p><button className="w3-button w3-padding-large w3-white w3-border"><b><Link to={`/post/${post.id}`} >READ MORE »</Link></b></button></p>
                                </div>
                                <div className="w3-col m4 w3-hide-small">
                                    <span className="w3-padding-large w3-right"><b>Votes  </b> <span className="w3-tag">{post.voteScore}</span></span>
                                    <button type='button' onClick={()=> this.onVote(post.id,UP_VOTE_POST)} className="w3-button w3-padding-large w3-white w3-border"><b>up</b></button>
                                    <button type='button' onClick={()=> this.onVote(post.id,DOWN_VOTE_POST)} className="w3-button w3-padding-large w3-white w3-border"><b>down</b></button>
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

const mapStateToProps = ({ posts, categories }) => ({
    posts
})

export default connect(mapStateToProps,{fetchPosts,sendVote})(PostList)