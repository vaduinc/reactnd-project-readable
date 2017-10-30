import {getCategories} from '../utils/categoryApiUtil'

export const RECEIVE_ALL_CATEGORIES = 'RECEIVE_ALL_CATEGORIES'

export const receiveCategories = (categories) => {
    return {
        type: RECEIVE_ALL_CATEGORIES,
        categories
    }
}

export const fetchCategories = () => dispatch => (
    getCategories()
        .then(categories => dispatch(receiveCategories(categories)))
)