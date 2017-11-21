import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link  } from 'react-router-dom'
import {fetchComments,UP_VOTE_POST,DOWN_VOTE_POST} from '../actions/commentActions'

class CommentList extends Component {

    componentDidMount() {
        this.props.fetchComments(this.props.postId)
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

        const { comments } = this.props.comments

        let filteredComment = comments || []
        //filteredComment.sort(this.dynamicSort(this.props.sorted))

        return (    

            <div className="w3-col l6 s12">     
                
                { 
                    filteredComment.map( (comment) => (
                    <div key={comment.id} className="w3-card-4 w3-margin w3-white">
                        <div className="w3-container">
                            <p>{comment.body}</p>
                            <span className="w3-opacity">{(new Date(comment.timestamp)).toDateString()}</span>
                            <div className="w3-row">
                                <div className="w3-col m8 s12">
                                    <p><button className="w3-button w3-padding-large w3-white w3-border"><b><Link to={`/comment/${comment.id}`} >READ MORE »</Link></b></button></p>
                                </div>
                                <div className="w3-col m4 w3-hide-small">
                                    Votes here
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
    comments
})

export default connect(mapStateToProps,{fetchComments})(CommentList)