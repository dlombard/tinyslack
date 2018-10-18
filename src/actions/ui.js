import {
  UI__OPEN_MODAL,
  UI__CLOSE_MODAL,
} from 'Constants'

export const openModal = (modalId) => (dispatch) => {
  dispatch({
    type: UI__OPEN_MODAL,
    modalId,
  })
}

export const closeModal = () => (dispatch) => {
  dispatch({type: UI__CLOSE_MODAL})
}
