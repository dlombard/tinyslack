import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Portal} from 'react-portal'
import {closeModal} from 'Actions/ui'
import styles from './styles.scss'

export class Modal extends PureComponent {
  render() {
    const {
      className,
      children,
      zIndex,
      currentModal,
      modalId,
      active,
      closeModal,
    } = this.props

    const isActive = active == null ? currentModal === modalId : active
    const activeClass = isActive ? styles.sActive : ''

    return (
      <Portal node={document && document.getElementById('portal-root')}>
        <div
          onClick={closeModal}
          className={`${styles.backdrop} ${activeClass}`}
          style={{zIndex}}/>

        <div className={`${styles.wrapper} ${activeClass}`} style={{zIndex}}>
          <div className={`${styles.modal} ${className || ''}`}>
            {children}

            <div className={styles.closeModal} onClick={closeModal} />
          </div>
        </div>
      </Portal>
    )
  }
}


const mapStateToProps = (state) => ({currentModal: state.ui.currentModal})
const mapDispatchToProps = (dispatch) => ({closeModal: () => dispatch(closeModal())})

export default connect(mapStateToProps, mapDispatchToProps)(Modal)
