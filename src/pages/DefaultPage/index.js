import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {openModal} from 'Actions/ui'
import styles from './styles.scss'

class DefaultPage extends PureComponent {
  render() {
    const {openModal} = this.props

    return (
      <div className={styles.wrapper}>
        <h1 className={styles.messageHeader}>
          Select a channel, or <span className={styles.cta} onClick={openModal}>create one</span>.
        </h1>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  openModal: () => dispatch(openModal('createChannel'))
})

export default connect(() => ({}), mapDispatchToProps)(DefaultPage)
