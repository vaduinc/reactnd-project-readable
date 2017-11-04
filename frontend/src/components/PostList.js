import React, { Component } from 'react'
import { connect } from 'react-redux'
import {fetchPosts} from '../actions/postActions'

class PostList extends Component {

    componentDidMount() {
        this.props.fetchPosts()
    }

    render() {

        const { posts } = this.props.posts

        return (    
            <div className="w3-col l6 s12">     
                
                { posts && (
                    posts.map( (post) => (
                    <div key={post.id} className="w3-card-4 w3-margin w3-white">
                        <div className="w3-container">
                            <h3><b>{post.title}</b></h3>
                            <h5>{post.author}, <span className="w3-opacity">April 7, 2014</span></h5>
                        </div>

                        <div className="w3-container">
                            <p>{post.body}</p>
                            <div className="w3-row">
                                <div className="w3-col m8 s12">
                                    <p><button className="w3-button w3-padding-large w3-white w3-border"><b>READ MORE »</b></button></p>
                                </div>
                                <div className="w3-col m4 w3-hide-small">
                                    <p><span className="w3-padding-large w3-right"><b>Comments  </b> <span className="w3-tag">0</span></span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    ))    
                )} 
            </div>    
        )
    }

}

const mapStateToProps = ({ posts, categories }) => ({
    posts
})

export default connect(mapStateToProps,{fetchPosts})(PostList)