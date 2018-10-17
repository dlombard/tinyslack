import React, {PureComponent, Fragment} from 'react'
import {connect} from 'react-redux'
import {TitleBar} from 'Components'

class ChannelPage extends PureComponent {
  render() {
    const {channelName} = this.props

    return (
      <Fragment>
        <TitleBar title={channelName} />
        <h1>This is channel: {channelName}</h1>
      </Fragment>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  channelName: ownProps.params.channelId,
})

export default connect(mapStateToProps)(ChannelPage)
