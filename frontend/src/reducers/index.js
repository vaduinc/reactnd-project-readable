import { combineReducers } from 'redux'
import {ADD_POST,EDIT_POST,REMOVE_POST,UP_VOTE_POST,ADOWN_VOTE_POSTDD_POST} from '../actions/postActions'
import {RECEIVE_ALL_CATEGORIES} from '../actions/categoryActions'


function posts (state = [], action){
    
    switch (action.type){
        case ADD_POST :
            const { post } = action
            return {
                ...state,
                post
            }
        default :
            return state    
    }
}


function categories (state = [], action){
    
    switch (action.type){
        case RECEIVE_ALL_CATEGORIES :
            const { categories } = action
            console.log(categories)
            const objCats = JSON.parse(categories) 
            return {
                ...state,
                categories: objCats.categories
            }
        default :
            return state    
    }
}


export default combineReducers({
    posts,
    categories
  });