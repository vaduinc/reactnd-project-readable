import { v4 } from 'uuid';

export function getPosts() {
    const url = `${process.env.REACT_APP_BACKEND}/posts`
    console.log('fetching from url', url);
    
    return fetch(url, { headers: { 'Authorization': 'whatever-you-want' },
                 credentials: 'include' } )
      .then( (res) =>  res.json() )
     // .then((data) =>  data )
}

export function getPost(postId) {
    const url = `${process.env.REACT_APP_BACKEND}/posts/${postId}`
    console.log('fetching from url', url);
    
    return fetch(url, { headers: { 'Authorization': 'whatever-you-want' },
                 credentials: 'include' } )
      .then( (res) =>  res.json() )
}

export function saveNewPosts(post) {
    const url = `${process.env.REACT_APP_BACKEND}/posts`;
    console.log('saving post', url)
    console.log(post)
    post.id = v4()
    post.timestamp = Date.now()
    console.log('ABOUT TO MAKE REQUEST WITH')
    console.log(post);
    
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
        console.log('saving existing post', url);
        
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
    console.log('saving post', url)
    const body ={option : voteType}
    
    return fetch(url, { 
                 method: 'POST',
                 headers: { 'Authorization': 'whatever-you-want' , 'content-type': 'application/json'  },
                 credentials: 'include' ,
                 body : JSON.stringify(body)             
                })
      .then( (res) =>  res.json() )
 }