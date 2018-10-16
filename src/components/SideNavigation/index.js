import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import styles from './styles.scss'

class SideNavigation extends PureComponent {
  render() {
    const {org, userName} = this.props
    return (
      <nav className={styles.navigation}>
        <div className={styles.header}>
          <div>
            <h3 className={styles.organizationName}>{org}</h3>
            <small className={styles.userName}>{userName}</small>
          </div>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = () => ({
  org: 'Organization',
  userName: 'First LastName'
})

export default connect(mapStateToProps)(SideNavigation)
