import {
  USER__LOG_IN,
  USER__LOG_OUT,
} from 'Constants'

export default function(state, action) {
  const {payload} = action

  switch (action.type) {
    case USER__LOG_IN: {
      return {...state, ...payload}
    }

    case USER__LOG_OUT: {
      return {}
    }

    default: {
      return {...state}
    }
  }
}
