import 'babel-polyfill'

import React, {PureComponent} from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import AppRouter from './router'
import history from './history'
import store from './store'

class App extends PureComponent {
  render() {
    const {store, history} = this.props

    return (
      <Provider store={store}>
        <AppRouter history={history} />
      </Provider>
    )
  }
}

const reactRoot = document.getElementById('react-root')
render(<App store={store} history={history} />, reactRoot)
