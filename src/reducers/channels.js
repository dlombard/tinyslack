
import {CHANNELS__LOAD} from 'Constants'

const defaultState = {channels: []}

export default function(state = defaultState, action) {
  switch (action.type) {
    case CHANNELS__LOAD: {
      const channels = action.payload
      return {...state, channels}
    }

    default: {
      return {...state}
    }
  }
}
