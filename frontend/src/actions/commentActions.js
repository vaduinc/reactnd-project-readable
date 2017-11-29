import {getComments,saveNewComment,saveExistingComment,saveVote,eraseComment} from '../utils/commentApiUtil'
import * as TYPES from './actionTypes'

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
        type: TYPES.RECEIVE_ALL_COMMENTS,
        comments
    }
}

export const fetchComments = (postId) => dispatch => (
    getComments(postId)
        .then(comments => dispatch(receiveComments(comments)))
)


export const addComment = (comment) => {
    return {
        type: TYPES.ADD_COMMENT,
        comment
    }
}

export const saveComment = (newComment) => dispatch => (
    saveNewComment(newComment)
        .then(comment => dispatch(addComment(comment)))
)

export const editComment = (updatedComment) => {
    return {
        type: TYPES.EDIT_COMMENT,
        updatedComment
    }
}

export const updateComment = (Comment) => dispatch => (
    saveExistingComment(Comment)
        .then(updatedComment => dispatch(editComment(updatedComment)))
)

export const removeComment = (updatedComment) => {
    return {
        type: TYPES.REMOVE_COMMENT,
        updatedComment
    }
}

export const deleteComment = (commentId) => dispatch => (
    eraseComment(commentId)
        .then(updatedComment => dispatch(removeComment(updatedComment)))
)