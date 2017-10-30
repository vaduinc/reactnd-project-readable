export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'
export const UP_VOTE_COMMENT = 'UP_VOTE_COMMENT'
export const DOWN_VOTE_COMMENT = 'DOWN_VOTE_COMMENT'

export const addComment = (comment) => {
    return {
        type: ADD_COMMENT,
        comment
    }
}

export const editComment = (comment) => {
    return {
        type: EDIT_COMMENT,
        comment
    }
}

export const removeComment = (id) => {
    return {
        type: REMOVE_COMMENT,
        id
    }
}

export const upVoteComment = (id) => {
    return {
        type: UP_VOTE_COMMENT,
        id
    }
}

export const downVoteComment = (id) => {
    return {
        type: DOWN_VOTE_COMMENT,
        id
    }
}