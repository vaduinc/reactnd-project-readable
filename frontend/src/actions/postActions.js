import {getPosts} from '../utils/postApiUtil'

export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const UP_VOTE_POST = 'UP_VOTE_POST'
export const DOWN_VOTE_POST = 'DOWN_VOTE_POST'
export const RECEIVE_ALL_POSTS = 'RECEIVE_ALL_POSTS'

export const receivePosts = (posts) => {
    return {
        type: RECEIVE_ALL_POSTS,
        posts
    }
}

export const fetchPosts = () => dispatch => (
    getPosts()
        .then(posts => dispatch(receivePosts(posts)))
)

export const addPost = (post) => {
    return {
        type: ADD_POST,
        post
    }
}

export const editPost = (post) => {
    return {
        type: EDIT_POST,
        post
    }
}

export const removePost = (id) => {
    return {
        type: REMOVE_POST,
        id
    }
}

export const upVotePost = (id) => {
    return {
        type: UP_VOTE_POST,
        id
    }
}

export const downVotePost = (id) => {
    return {
        type: DOWN_VOTE_POST,
        id
    }
}