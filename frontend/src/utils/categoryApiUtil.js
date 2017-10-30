export function getCategories() {
    const url = `${process.env.REACT_APP_BACKEND}/categories`;
    console.log('fetching from url', url);
    
    return fetch(url, { headers: { 'Authorization': 'whatever-you-want' },
                 credentials: 'include' } )
      .then( (res) =>  res.json() )
      .then((data) =>  data.categories )
  }