import {getCategories} from '../utils/categoryApiUtil'
import * as TYPES from './actionTypes'

export const receiveCategories = (categories) => {
    return {
        type: TYPES.RECEIVE_ALL_CATEGORIES,
        categories
    }
}

export const fetchCategories = () => dispatch => (
    getCategories()
        .then(categories => dispatch(receiveCategories(categories)))
)