import {saveVote, getPost, getPosts,saveNewPosts,saveExistingPosts,erasePost} from '../utils/postApiUtil'
import * as TYPES from './actionTypes'

export const vote = (voteType,updatedPost) => {
    return {
        type: voteType,
        updatedPost
    }
}

export const sendVote = (postId,voteType) => dispatch => (
    saveVote(postId,(voteType==='UP_VOTE_POST'?'upVote':'downVote'))
        .then(updatedPost => dispatch(vote(voteType,updatedPost)))
)


export const receivePosts = (posts) => {
    return {
        type: TYPES.RECEIVE_ALL_POSTS,
        posts
    }
}

export const fetchPosts = () => dispatch => (
    getPosts()
        .then(posts => dispatch(receivePosts(posts)))
)

export const receivePost = (loadedPost) => {
    return {
        type: TYPES.RECEIVE_POST,
        loadedPost
    }
}

export const fetchPost = (postId) => dispatch => (
    getPost(postId)
        .then(post => dispatch(receivePost(post)))
        //.then(post => post)
)

export const addPost = (post) => {
    return {
        type: TYPES.ADD_POST,
        post
    }
}

export const savePost = (newPost) => dispatch => (
    saveNewPosts(newPost)
        .then(post => dispatch(addPost(post)))
)

export const editPost = (updatedPost) => {
    return {
        type: TYPES.EDIT_POST,
        updatedPost
    }
}

export const updatePost = (post) => dispatch => (
    saveExistingPosts(post)
        .then(updatedPost => dispatch(editPost(updatedPost)))
)

export const removePost = (removedPost) => {
    return {
        type: TYPES.REMOVE_POST,
        removedPost
    }
}

export const deletePost = (postId) => dispatch => (
    erasePost(postId)
        .then(updatedPost => dispatch(removePost(updatedPost)))
)