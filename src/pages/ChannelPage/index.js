import React, {PureComponent, Fragment} from 'react'
import {connect} from 'react-redux'
import {TitleBar} from 'Components'

class ChannelPage extends PureComponent {
  render() {
    const {channel} = this.props

    console.log(channel)

    return (
      <Fragment>
        <TitleBar title={channel.channelName} />
        <h1>This is channel: {channel.channelName}</h1>
      </Fragment>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  let currentChannel = {}

  state.channels.channels.forEach((channel) => {
    if (channel.channelId === ownProps.params.channelId) {
      currentChannel = channel
    }
  })

  return {channel: currentChannel}
}

export default connect(mapStateToProps)(ChannelPage)
