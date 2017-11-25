export function getCategories() {
    const url = `${process.env.REACT_APP_BACKEND}/categories`;
    
    return fetch(url, { headers: { 'Authorization': 'whatever-you-want' },
                 credentials: 'include' } )
      .then( (res) =>  res.json() )
      .then((data) =>  data.categories )
  }