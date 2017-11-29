import * as TYPES from '../actions/actionTypes'

export function comments (state = [], action){
    
    switch (action.type){
        case TYPES.ADD_COMMENT :
            const { comment } = action
            return {
                ...state,
                dataCollection: state.dataCollection.concat(comment)
            }
        case TYPES.EDIT_COMMENT : case TYPES.UP_VOTE_COMMENT : case TYPES.DOWN_VOTE_COMMENT: case TYPES.REMOVE_COMMENT:
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
        case TYPES.RECEIVE_ALL_COMMENTS :
            const { comments } = action
            return {
                ...state,
                dataCollection: comments
            }   
        default :
            return state    
    }
}