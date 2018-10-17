import React from 'react'
import {Router, Route} from 'react-router'
import {AppLayout} from 'Components'
import {
  LoginPage,
  SignupPage,
  ChannelPage,
  ConfirmEmailPage,
} from 'Pages'

export default ({history}) => (
  <Router history={history}>
    <Route path='/login' component={LoginPage} />
    <Route path='/signup' component={SignupPage} />
    <Route path='/confirm-email' component={ConfirmEmailPage} />
    <Route path='/' component={AppLayout}>
      <Route exact path='/channel/:channelId' component={ChannelPage}/>
    </Route>
  </Router>
)
