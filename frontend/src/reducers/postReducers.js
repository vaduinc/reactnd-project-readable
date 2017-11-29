import * as TYPES from '../actions/actionTypes'

export function posts (state = [], action){
    
    switch (action.type){
        case TYPES.ADD_POST :
            const { post } = action
            return {
                ...state,
                dataCollection: state.dataCollection.concat(post)
            }
        case TYPES.EDIT_POST : case TYPES.UP_VOTE_POST : case TYPES.DOWN_VOTE_POST:
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
        case TYPES.RECEIVE_ALL_POSTS :
            const { posts } = action
            return {
                ...state,
                dataCollection: posts
            } 
        case TYPES.REMOVE_POST :
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