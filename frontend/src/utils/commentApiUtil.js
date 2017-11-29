import { v4 } from 'uuid'
import {configURL,HEADERS} from './configUtil'

export function getComments(postId) {
    const url = `${configURL}/posts/${postId}/comments`
    
    return fetch(url, { headers: HEADERS} )
      .then( (res) =>  res.json() )
}

export function saveNewComment(comment) {
    const url = `${configURL}/comments`;
    comment.id = v4()
    comment.timestamp = Date.now()
    
    return fetch(url, { 
                 method: 'POST',
                 headers: HEADERS  ,
                 body : JSON.stringify(comment)             
                })
      .then( (res) =>  res.json() )
 }
  
export function saveExistingComment(comment) {
        const url = `${configURL}/comments/${comment.id}`
        
        return fetch(url, { 
                     method: 'PUT',
                     headers: HEADERS ,
                     body : JSON.stringify(comment)             
                    })
          .then( (res) =>  res.json() )
}

export function saveVote(commentId,voteType) {
    const url = `${configURL}/comments/${commentId}`
    const body ={option : voteType}
    
    return fetch(url, { 
                 method: 'POST',
                 headers: HEADERS ,
                 body : JSON.stringify(body)             
                })
      .then( (res) =>  res.json() )
 }

 
 export function eraseComment(commentId) {
    const url = `${configURL}/comments/${commentId}`
    
    return fetch(url, { 
                method: 'DELETE',
                headers: HEADERS            
                })
    .then( (res) =>  res.json() )
}