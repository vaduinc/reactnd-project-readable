export function getPosts() {
    const url = `${process.env.REACT_APP_BACKEND}/posts`;
    console.log('fetching from url', url);
    
    return fetch(url, { headers: { 'Authorization': 'whatever-you-want' },
                 credentials: 'include' } )
      .then( (res) =>  res.json() )
      .then((data) =>  data.categories )
  }