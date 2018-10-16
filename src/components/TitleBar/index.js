import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import styles from './styles.scss'

class TitleBar extends PureComponent {
  render() {
    const {roomName} = this.props

    return (
      <div className={styles.bar}>
        <h3 className={styles.title}>{roomName}</h3>
      </div>
    )
  }
}

const mapStateToProps = () => ({roomName: 'Room Title'})

export default connect(mapStateToProps)(TitleBar)
