import React, {PureComponent} from 'react'
import {SideNavigation} from 'Components'
import {DefaultPage} from 'Pages'
import styles from './styles.scss'

export default class AppLayout extends PureComponent {
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
