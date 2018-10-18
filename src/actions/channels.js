import {
  CHANNEL__CREATE,
  CHANNELS__LOAD,
} from 'Constants'
import Stitch from 'Stitch'

export const createChannel = ({name, description}) => async (dispatch) => {
  dispatch({
    type: CHANNEL__CREATE,
    payload: await Stitch.callFunction('createChannel', [{name, description, isPrivate: false}]),
  })

  dispatch(loadChannels())
}

export const loadChannels = () => async (dispatch) => {
  const {channels} = await Stitch.callFunction('listChannels', [])

  dispatch({
    type: CHANNELS__LOAD,
    payload: channels,
  })
}
