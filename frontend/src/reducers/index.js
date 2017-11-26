import { combineReducers } from 'redux'
import {ADD_COMMENT, EDIT_COMMENT, RECEIVE_ALL_COMMENTS ,UP_VOTE_COMMENT ,DOWN_VOTE_COMMENT,REMOVE_COMMENT} from '../actions/commentActions'
import {ADD_POST,EDIT_POST,REMOVE_POST,UP_VOTE_POST,DOWN_VOTE_POST,RECEIVE_ALL_POSTS} from '../actions/postActions'
import {RECEIVE_ALL_CATEGORIES} from '../actions/categoryActions'

function comments (state = [], action){
    
    switch (action.type){
        case ADD_COMMENT :
            const { comment } = action
            return {
                ...state,
                dataCollection: state.dataCollection.concat(comment)
            }
        case EDIT_COMMENT : case UP_VOTE_COMMENT : case DOWN_VOTE_COMMENT: case REMOVE_COMMENT:
            const { updatedComment } = action
            return {dataCollection : state.dataCollection.map( (item) => {
                            if (item.id !== updatedComment.id){
                                return item;
                            }
                            return {
                                ...item,
                                ...updatedComment
                            } 
                        })
                    }    
        case RECEIVE_ALL_COMMENTS :
            const { comments } = action
            return {
                ...state,
                dataCollection: comments
            }   
        default :
            return state    
    }
}


function posts (state = [], action){
    
    switch (action.type){
        case ADD_POST :
            const { post } = action
            return {
                ...state,
                dataCollection: state.dataCollection.concat(post)
            }
        case EDIT_POST : case UP_VOTE_POST : case DOWN_VOTE_POST:
            const { updatedPost } = action
            return {dataCollection : state.dataCollection.map( (item) => {
                            if (item.id !== updatedPost.id){
                                return item;
                            }
                            return {
                                ...item,
                                ...updatedPost
                            } 
                        })
                    }
        case RECEIVE_ALL_POSTS :
            const { posts } = action
            return {
                ...state,
                dataCollection: posts
            } 
        case REMOVE_POST :
            const { removedPost } = action
            console.log(removedPost)
            return {
                ...state,
                dataCollection: state.dataCollection.filter((item) => {
                     return item.id !== removedPost.id
                }  )
            }                   
        default :
            return state    
    }
}


function categories (state = [], action){
    
    switch (action.type){
        case RECEIVE_ALL_CATEGORIES :
            const { categories } = action
            return {
                ...state,
                dataCollection: categories
            }
        default :
            return state    
    }
}


export default combineReducers({
    comments,
    posts,
    categories
  });