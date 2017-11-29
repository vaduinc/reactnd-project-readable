import * as TYPES from '../actions/actionTypes'

export function categories (state = [], action){
    
    switch (action.type){
        case TYPES.RECEIVE_ALL_CATEGORIES :
            const { categories } = action
            return {
                ...state,
                dataCollection: categories
            }
        default :
            return state    
    }
}