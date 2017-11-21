import {saveVote, getPosts,getPost,saveNewPosts,saveExistingPosts} from '../utils/postApiUtil'

export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const UP_VOTE_POST = 'UP_VOTE_POST'
export const DOWN_VOTE_POST = 'DOWN_VOTE_POST'
export const RECEIVE_ALL_POSTS = 'RECEIVE_ALL_POSTS'

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

export const savePost = (newPost) => dispatch => (
    saveNewPosts(newPost)
        .then(post => dispatch(addPost(post)))
)

export const editPost = (updatedPost) => {
    return {
        type: EDIT_POST,
        updatedPost
    }
}

export const updatePost = (post) => dispatch => (
    saveExistingPosts(post)
        .then(updatedPost => dispatch(editPost(updatedPost)))
)

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