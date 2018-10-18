import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import Stitch from 'Stitch'
import {getCurrentUser} from 'Actions/user'
import {closeModal} from 'Actions/ui'
import {SideNavigation} from 'Components'
import {DefaultPage} from 'Pages'
import styles from './styles.scss'

class AppLayout extends PureComponent {
  componentWillMount() {
    const {closeModal, pushLocation, getCurrentUser} = this.props

    getCurrentUser()

    if (!Stitch.auth.isLoggedIn) {
      pushLocation('/login')
    }

    document.onkeyup = function(e) {
      if ((e || window.event).keyCode === 27) {
        closeModal()
      }
    }
  }

  render() {
    const {children} = this.props

    return (
      <div className={styles.wrapper}>
        <SideNavigation />
        <div className={styles.rightContent}>
          {children || <DefaultPage />}
        </div>
      </div>
    )
  }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch) => ({
  closeModal: () => dispatch(closeModal()),
  pushLocation: (to) => dispatch(push(to)),
  getCurrentUser: () => dispatch(getCurrentUser()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AppLayout)