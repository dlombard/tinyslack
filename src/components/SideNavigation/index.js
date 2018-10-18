import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import {Link} from 'react-router'
import {logOutUser} from 'Actions/user'
import {openModal} from 'Actions/ui'
import {loadChannels} from 'Actions/channels'
import CreateChannelModal from './CreateChannelModal'
import styles from './styles.scss'

class SideNavigation extends PureComponent {
  componentDidMount() {
    const {loadChannels} = this.props

    loadChannels()
  }

  render() {
    const {userEmail, channels = [], pathEnd} = this.props

    return (
      <nav className={styles.navigation}>
        <div className={styles.header}>
          <p className={styles.userName}>{userEmail}</p>
        </div>
        <br />
        <label className={styles.channelLabel}>
          Channels
          <div
            title='Create new channel'
            className={styles.openModalButton}
            onClick={this.openCreateChannelModal}>
            +
          </div>
        </label>
        {channels.map((channel) => (
          <Link
            className={`${styles.channel} ${pathEnd === channel.channelId ? styles.sActive : ''}`}
            key={channel.channelId}
            to={`/channel/${channel.channelId}`}>
            #&nbsp;&nbsp;
            {channel.channelName}
          </Link>
        ))}
        <button onClick={this.logOut}>Log Out</button>

        <CreateChannelModal />
      </nav>
    )
  }

  logOut = async () => {
    const {
      pushLocation,
      logOutUser,
    } = this.props

    await logOutUser()
    pushLocation('/login')
  }

  openCreateChannelModal = () => {
    const {openModal} = this.props

    openModal('createChannel')
  }
}

const mapStateToProps = ({user, channels, router}) => {
  const splitPath = router.locationBeforeTransitions.pathname.split('/')

  return {
    userEmail: user.profile && user.profile.data.email,
    channels: channels.channels,
    pathEnd: splitPath[splitPath.length - 1],
  }
}

const mapDispatchToProps = (dispatch) => ({
  pushLocation: (to) => dispatch(push(to)),
  logOutUser: () => dispatch(logOutUser()),
  openModal: (modalId) => dispatch(openModal(modalId)),
  loadChannels: () => dispatch(loadChannels()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SideNavigation)
