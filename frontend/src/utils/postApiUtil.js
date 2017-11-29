import { v4 } from 'uuid'
import {configURL,HEADERS} from './configUtil'

export function getPosts() {
    const url = `${configURL}/posts`
    
    return fetch(url, { headers: HEADERS } )
      .then( (res) =>  res.json() )
}

export function getPost(postId) {
    const url = `${configURL}/posts/${postId}`
    
    return fetch(url, { headers: HEADERS })
      .then( (res) =>  res.json() )
}

export function saveNewPosts(post) {
    const url = `${configURL}/posts`;
    post.id = v4()
    post.timestamp = Date.now()
    
    return fetch(url, { 
                 method: 'POST',
                 headers: HEADERS,
                 body : JSON.stringify(post)             
                })
      .then( (res) =>  res.json() )
 }
  
export function saveExistingPosts(post) {
        const url = `${configURL}/posts/${post.id}`
        
        return fetch(url, { 
                     method: 'PUT',
                     headers: HEADERS ,
                     body : JSON.stringify(post)             
                    })
          .then( (res) =>  res.json() )
}

export function saveVote(postId,voteType) {
    const url = `${configURL}/posts/${postId}`
    const body ={option : voteType}
    
    return fetch(url, { 
                 method: 'POST',
                 headers: HEADERS ,
                 body : JSON.stringify(body)             
                })
      .then( (res) =>  res.json() )
 }

export function erasePost(postId) {
    const url = `${configURL}/posts/${postId}`
    
    return fetch(url, { 
                method: 'DELETE',
                headers: HEADERS         
                })
    .then( (res) =>  res.json() )
}