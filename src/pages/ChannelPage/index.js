import React, {PureComponent, Fragment} from 'react'
import {connect} from 'react-redux'
import {getMessages, sendMessage} from 'Actions/channels'
import {Poll} from 'Utils'
import {TitleBar} from 'Components'
import styles from './styles.scss'

class Message extends PureComponent {
  render() {
    const {username, message} = this.props.message

    return (
      <div className={styles.messageWrapper}>
        <strong>{username}</strong>
        <div>{message}</div>
      </div>
    )
  }
}

class ChannelPage extends PureComponent {
  defaultState = {
    message: '',
    initialScroll: false,
  }

  state = this.defaultState

  componentDidMount() {
    setTimeout(this.getMessages, 300)

    this.polling = new Poll(this.getMessages, {interval: 20000})
    this.polling.start()
  }

  componentDidUpdate(prevProps) {
    const {params} = this.props

    if(prevProps === undefined) {
      return false
    }

    if (prevProps.params.channelId !== params.channelId) {
      const method = () => this.getMessages(params.channelId)
      setTimeout(method, 300)
      this.polling.setMethod(method)
    }
  }

  componentWillUnmount() {
    this.polling.stop()
  }

  render() {
    const {channel} = this.props
    const {message} = this.state

    return (
      <div className={styles.wrapper}>
        <TitleBar title={channel.name} />

        <div
          onScroll={this.scrollHandler}
          ref={(container) => this.messageContainer = container}
          className={styles.messageContainer}>
          {channel.messages && channel.messages.map((message, index) => (
            <Message key={index} message={message} />
          ))}
        </div>

        <form className={styles.messageBar} onSubmit={this.onSubmit}>
          <input
            className={styles.messageBarInput}
            type='text'
            value={message}
            onChange={this.onChange} />

          <button className={styles.messageBarSend} type='submit'>Send</button>
        </form>
      </div>
    )
  }

  getMessages = async (channelId) => {
    await this.props.getMessages(channelId)

    if (!this.state.isScrolled) {
      this.scrollToBottom()
    }
  }

  scrollHandler = (e) => {
    this.setState({
      isScrolled:
        this.messageContainer.scrollTop < (this.messageContainer.scrollHeight - this.messageContainer.offsetHeight),
    })
  }

  onSubmit = async (e) => {
    const {channel, sendMessage} = this.props

    e.preventDefault()

    const messageParams = {
      channelId: channel._id,
      channelName: channel.name,
      message: this.state.message,
    }

    await sendMessage(messageParams)
    this.reset()
  }

  onChange = (e) => {
    const {value} = e.target

    this.setState({message: value})
  }

  reset() {
    this.setState(this.defaultState)
  }

  scrollToBottom() {
    this.messageContainer.scrollTo(0, this.messageContainer.scrollHeight);
  }
}

const mapStateToProps = (state, ownProps) => {
  let currentChannel = {}

  state.channels.channels.forEach((channel) => {
    if (channel._id.toHexString() === ownProps.params.channelId) {
      currentChannel = channel
    }
  })

  return {channel: currentChannel}
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  getMessages: (channelId) => dispatch(getMessages({$oid: channelId || ownProps.params.channelId})),
  sendMessage: ({channelId, channelName, message}) => dispatch(sendMessage({channelId, channelName, message})),
})

export default connect(mapStateToProps, mapDispatchToProps)(ChannelPage)
