import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Home from './components/Home'
import registerServiceWorker from './registerServiceWorker'
import reducer from './reducers'
import {Provider} from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import {BrowserRouter,Route, Switch} from 'react-router-dom'
import Post from './components/Post'
import PostSave from './components/PostSave'
import CommentSave from './components/CommentSave'
import Header from './components/Header'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
    reducer,
    composeEnhancers(
      applyMiddleware(thunk)
    )
  )

ReactDOM.render(
      <Provider store={store} >
        <BrowserRouter>
          <div className="w3-content" style={{maxwidth: 800}} >
            <Header /> 
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/:category' render={(props) => (
                  <Home 
                      selCategory={props.match.params.category}
                    />
                )}/>
                <Route exact path='/postSave/edit/:postId' render={({ history }) => (
                  <PostSave  action='edit' />
                )}/>
                <Route exact path='/postSave/add' render={({ history }) => (
                  <PostSave  action='add' />
                )}/>
                <Route path='/post/:postId?' render={({ history }) => (
                  <Post onSavedPost={ () => {
                    history.push('/')
                  } } />
                )}/>
                <Route exact path='/:category/:postId?' render={({ history }) => (
                  <Post onSavedPost={ () => {
                    history.push('/')
                  } } />
                )}/>
                <Route exact path='/commentSave/:action/:commentId?' render={(props) => (
                  <CommentSave 
                      action='edit'
                      commentId={props.match.params.commentId}
                    />
                )}/>
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    , document.getElementById('root'))
registerServiceWorker()