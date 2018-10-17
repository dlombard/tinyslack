import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import {logOutUser} from 'Actions/user'
import styles from './styles.scss'

class SideNavigation extends PureComponent {
  render() {
    const {org, userEmail} = this.props
    return (
      <nav className={styles.navigation}>
        <div className={styles.header}>
          <div>
            <h3 className={styles.organizationName}>{org}</h3>
            <small className={styles.userName}>{userEmail}</small>
          </div>
        </div>
        <button onClick={this.logOut}>Log Out</button>
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
}

const mapStateToProps = ({user}) => ({
  org: 'Organization',
  userEmail: user.profile && user.profile.data.email
})

const mapDispatchToProps = (dispatch) => ({
  pushLocation: (to) => dispatch(push(to)),
  logOutUser: () => dispatch(logOutUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(SideNavigation)
