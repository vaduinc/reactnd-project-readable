import { combineReducers } from 'redux'
import {ADD_POST,EDIT_POST,REMOVE_POST,UP_VOTE_POST,DOWN_VOTE_POST,RECEIVE_ALL_POSTS} from '../actions/postActions'
import {RECEIVE_ALL_CATEGORIES} from '../actions/categoryActions'


function posts (state = [], action){
    
    switch (action.type){
        case ADD_POST :
            const { post } = action
            console.log(post)
            return {
                ...state,
                posts: state.posts.concat(post)
            }
        case EDIT_POST :
            const { updatedPost } = action
            console.log(state.posts)
            return {posts : state.posts.map( (item) => {
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
            console.log(posts)
            return {
                ...state,
                posts: posts
            }   
        // case RECEIVE_POST :
        //     const { editPost } = action
        //     console.log(editPost)
        //     return {
        //         ...state,
        //         post: editPost
        //     }      
        default :
            return state    
    }
}


function categories (state = [], action){
    
    switch (action.type){
        case RECEIVE_ALL_CATEGORIES :
            const { categories } = action
            console.log(categories)
            return {
                ...state,
                categories: categories
            }
        default :
            return state    
    }
}


export default combineReducers({
    posts,
    categories
  });