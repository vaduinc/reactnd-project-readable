import { v4 } from 'uuid';

export function getComments(postId) {
    const url = `${process.env.REACT_APP_BACKEND}/posts/${postId}/comments`
    console.log('fetching from url', url);
    
    return fetch(url, { headers: { 'Authorization': 'whatever-you-want' },
                 credentials: 'include' } )
      .then( (res) =>  res.json() )
     // .then((data) =>  data )
}

export function saveNewComment(comment) {
    const url = `${process.env.REACT_APP_BACKEND}/comments`;
    console.log('saving comment', url)
    console.log(comment)
    comment.id = v4()
    comment.timestamp = Date.now()
    console.log('ABOUT TO MAKE REQUEST WITH')
    console.log(comment);
    
    return fetch(url, { 
                 method: 'POST',
                 headers: { 'Authorization': 'whatever-you-want' , 'content-type': 'application/json'  },
                 credentials: 'include' ,
                 body : JSON.stringify(comment)             
                })
      .then( (res) =>  res.json() )
 }
  
export function saveExistingComment(comment) {
        const url = `${process.env.REACT_APP_BACKEND}/comments/${comment.id}`
        console.log('saving existing comment', url);
        
        return fetch(url, { 
                     method: 'PUT',
                     headers: { 'Authorization': 'whatever-you-want' , 'content-type': 'application/json'  },
                     credentials: 'include' ,
                     body : JSON.stringify(comment)             
                    })
          .then( (res) =>  res.json() )
}

export function saveVote(commentId,voteType) {
    const url = `${process.env.REACT_APP_BACKEND}/comments/${commentId}`
    console.log('saving vote comment', url)
    const body ={option : voteType}
    
    return fetch(url, { 
                 method: 'POST',
                 headers: { 'Authorization': 'whatever-you-want' , 'content-type': 'application/json'  },
                 credentials: 'include' ,
                 body : JSON.stringify(body)             
                })
      .then( (res) =>  res.json() )
 }

 
 export function eraseComment(commentId) {
    const url = `${process.env.REACT_APP_BACKEND}/comments/${commentId}`
    console.log('erase comment', url)
    
    return fetch(url, { 
                method: 'DELETE',
                headers: { 'Authorization': 'whatever-you-want' , 'content-type': 'application/json'  },
                credentials: 'include'            
                })
    .then( (res) =>  res.json() )
}