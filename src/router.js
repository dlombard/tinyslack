import React from 'react'
import {Router, Route, Redirect} from 'react-router'
import {Layout} from 'Components'
import {
  DefaultPage,
  LoginPage,
  SignupPage,
  ChannelPage,
} from 'Pages'

export default ({history}) => (
  <Router history={history}>
    <Route path='/login' component={LoginPage} />
    <Route path='/signup' component={SignupPage} />
    <Route path='/' component={Layout}>
      <Route exact path='/channel/:channelId' component={ChannelPage}/>
      <Route path='/' component={DefaultPage} />
    </Route>
  </Router>
)
