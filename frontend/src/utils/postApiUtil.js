import { v4 } from 'uuid';

export function getPosts() {
    const url = `${process.env.REACT_APP_BACKEND}/posts`
    
    return fetch(url, { headers: { 'Authorization': 'whatever-you-want' },
                 credentials: 'include' } )
      .then( (res) =>  res.json() )
}

export function saveNewPosts(post) {
    const url = `${process.env.REACT_APP_BACKEND}/posts`;
    post.id = v4()
    post.timestamp = Date.now()
    
    return fetch(url, { 
                 method: 'POST',
                 headers: { 'Authorization': 'whatever-you-want' , 'content-type': 'application/json'  },
                 credentials: 'include' ,
                 body : JSON.stringify(post)             
                })
      .then( (res) =>  res.json() )
 }
  
export function saveExistingPosts(post) {
        const url = `${process.env.REACT_APP_BACKEND}/posts/${post.id}`
        
        return fetch(url, { 
                     method: 'PUT',
                     headers: { 'Authorization': 'whatever-you-want' , 'content-type': 'application/json'  },
                     credentials: 'include' ,
                     body : JSON.stringify(post)             
                    })
          .then( (res) =>  res.json() )
}

export function saveVote(postId,voteType) {
    const url = `${process.env.REACT_APP_BACKEND}/posts/${postId}`
    const body ={option : voteType}
    
    return fetch(url, { 
                 method: 'POST',
                 headers: { 'Authorization': 'whatever-you-want' , 'content-type': 'application/json'  },
                 credentials: 'include' ,
                 body : JSON.stringify(body)             
                })
      .then( (res) =>  res.json() )
 }

export function erasePost(postId) {
    const url = `${process.env.REACT_APP_BACKEND}/posts/${postId}`
    
    return fetch(url, { 
                method: 'DELETE',
                headers: { 'Authorization': 'whatever-you-want' , 'content-type': 'application/json'  },
                credentials: 'include'            
                })
    .then( (res) =>  res.json() )
}