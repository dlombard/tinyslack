import React from 'react'
import {Router, Route} from 'react-router'
import Layout from 'Components/Layout'

export default ({history}) => (
  <Router history={history}>
    <Route path='/' component={Layout} />
  </Router>
)
