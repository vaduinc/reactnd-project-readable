import {getComments,saveNewComment,saveExistingComment,saveVote,eraseComment} from '../utils/commentApiUtil'

export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'
export const UP_VOTE_COMMENT = 'UP_VOTE_COMMENT'
export const DOWN_VOTE_COMMENT = 'DOWN_VOTE_COMMENT'
export const RECEIVE_ALL_COMMENTS = 'RECEIVE_ALL_COMMENTS'

export const vote = (voteType,updatedComment) => {
    return {
        type: voteType,
        updatedComment
    }
}

export const sendVoteComment = (commentId,voteType) => dispatch => (
    saveVote(commentId,(voteType==='UP_VOTE_COMMENT'?'upVote':'downVote'))
        .then(updatedComment => dispatch(vote(voteType,updatedComment)))
)


export const receiveComments = (comments) => {
    return {
        type: RECEIVE_ALL_COMMENTS,
        comments
    }
}

export const fetchComments = (postId) => dispatch => (
    getComments(postId)
        .then(comments => dispatch(receiveComments(comments)))
)


export const addComment = (comment) => {
    return {
        type: ADD_COMMENT,
        comment
    }
}

export const saveComment = (newComment) => dispatch => (
    saveNewComment(newComment)
        .then(comment => dispatch(addComment(comment)))
)

export const editComment = (updatedComment) => {
    return {
        type: EDIT_COMMENT,
        updatedComment
    }
}

export const updateComment = (Comment) => dispatch => (
    saveExistingComment(Comment)
        .then(updatedComment => dispatch(editComment(updatedComment)))
)

export const removeComment = (updatedComment) => {
    return {
        type: REMOVE_COMMENT,
        updatedComment
    }
}

export const deleteComment = (commentId) => dispatch => (
    eraseComment(commentId)
        .then(updatedComment => dispatch(removeComment(updatedComment)))
)