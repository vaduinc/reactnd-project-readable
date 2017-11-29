import {configURL,HEADERS} from './configUtil'

export function getCategories() {
    const url = `${configURL}/categories`;
    
    return fetch(url, { headers: HEADERS} )
      .then( (res) =>  res.json() )
      .then((data) =>  data.categories )
  }