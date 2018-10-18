import {
  UI__OPEN_MODAL,
  UI__CLOSE_MODAL,
} from 'Constants'

const defaultState = {currentModal: null}

export default function(state = defaultState, action) {
  switch (action.type) {
    case UI__OPEN_MODAL: {
      const {modalId} = action
      return {...state, currentModal: modalId}
    }

    case UI__CLOSE_MODAL: {
      return {...state, currentModal: null}
    }

    default: {
      return {...state}
    }
  }
}
