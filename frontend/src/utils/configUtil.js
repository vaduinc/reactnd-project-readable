const envURL = `${process.env.REACT_APP_BACKEND}`

export const configURL = envURL || 'http://localhost:3001'

export const HEADERS = { 'Authorization': 'whatever-you-want' , 'content-type': 'application/json'  }