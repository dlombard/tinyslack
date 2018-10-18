import {combineReducers} from 'redux'
import {routerReducer as router} from 'react-router-redux'
import user from './user'
import ui from './ui'
import channels from './channels'

export default combineReducers({router, user, ui, channels})
