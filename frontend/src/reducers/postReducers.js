import * as TYPES from '../actions/actionTypes'

export function posts (state = [], action){
    
    switch (action.type){
        case TYPES.ADD_POST :
            const { post } = action
            if(state.dataCollection){
                return {
                    ...state,
                    dataCollection: state.dataCollection.concat(post)
                }
            }else{
                return state
            }
        case TYPES.EDIT_POST : case TYPES.UP_VOTE_POST : case TYPES.DOWN_VOTE_POST:
            const { updatedPost } = action
            if(state.dataCollection){
                return {dataCollection : state.dataCollection.map( (item) => {
                            if (item.id !== updatedPost.id){
                                return item;
                            }
                            return {
                                ...item,
                                ...updatedPost
                            } 
                        }),
                        loadedPost:updatedPost
                    }
            }else{
                return state
            }        
        case TYPES.RECEIVE_ALL_POSTS :
            const { posts } = action
            return {
                ...state,
                dataCollection: posts
            } 
        case TYPES.REMOVE_POST :
            const { removedPost } = action
            if(state.dataCollection){
                return {
                    ...state,
                    dataCollection: state.dataCollection.filter((item) => {
                        return item.id !== removedPost.id
                    }  )
                }
            }else{
                return state
            }
        case TYPES.RECEIVE_POST :
            const { loadedPost } = action
            return {
                ...state,
                loadedPost
            }                       
        default :
            return state    
    }
}