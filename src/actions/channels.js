import {
  CHANNEL__CREATE,
  CHANNELS__LOAD,
  MESSAGES__LOAD,
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
  dispatch({
    type: CHANNELS__LOAD,
    payload: await Stitch.callFunction('listChannels', []),
  })
}

export const getMessages = (channelId) => async (dispatch) => {
  const messages = await Stitch.callFunction('getMessages', [{channelId}])

  dispatch({
    type: MESSAGES__LOAD,
    channelId: channelId.$oid,
    payload: messages.reverse(),
  })
}

export const sendMessage = ({channelId, channelName, message}) => async (dispatch) => {
  await Stitch.callFunction('addMessage', [{channelId, channelName, message}])
}
