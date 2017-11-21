import { v4 } from 'uuid';

export function getComments(postId) {
    const url = `${process.env.REACT_APP_BACKEND}/posts/${postId}/comments`
    console.log('fetching from url', url);
    
    return fetch(url, { headers: { 'Authorization': 'whatever-you-want' },
                 credentials: 'include' } )
      .then( (res) =>  res.json() )
     // .then((data) =>  data )
}