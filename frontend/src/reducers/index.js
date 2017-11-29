import { combineReducers } from 'redux'
import {comments} from './commentReducers'
import {categories} from './categoryReducers'
import {posts} from './postReducers'

export default combineReducers({
    comments,
    posts,
    categories
  });