import thunk from 'redux-thunk'
import {browserHistory} from 'react-router'
import {createStore, applyMiddleware} from 'redux'
import {routerMiddleware} from 'react-router-redux'
import reducers from 'Reducers'

const middleware = [thunk, routerMiddleware(browserHistory)]

export default createStore(
  reducers,
  {},
  applyMiddleware(...middleware),
)
