
import {
  CHANNELS__LOAD,
  MESSAGES__LOAD,
} from 'Constants'

const defaultState = {channels: []}

export default function(state = defaultState, action) {
  switch (action.type) {
    case CHANNELS__LOAD: {
      const channels = action.payload
      return {
        ...state,
        channels: channels.map((channel) => {
          let newChannel = channel

          state.channels.forEach((stateChannel) => {
            if (stateChannel._id === channel._id) {
              newChannel = {...stateChannel, ...channel}
            }
          })

          return newChannel
        }),
      }
    }

    case MESSAGES__LOAD: {
      const messages = action.payload
      const channelId = action.channelId

      return {
        ...state,
        channels: state.channels.map((channel) => {
          if (channel._id.toHexString() === channelId) {
            return {...channel, messages}
          }

          return {...channel, messages: []}
        })
      }
    }

    default: {
      return {...state}
    }
  }
}
