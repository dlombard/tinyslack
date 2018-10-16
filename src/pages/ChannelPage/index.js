import React, {PureComponent, Fragment} from 'react'
import {connect} from 'react-redux'
import {TitleBar} from 'Components'

class ChannelPage extends PureComponent {
  render() {
    const {channelId} = this.props

    return (
      <Fragment>
        <TitleBar />
        <h1>This is channel: {channelId}</h1>
      </Fragment>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  channelId: ownProps.params.channelId,
})

export default connect(mapStateToProps)(ChannelPage)
