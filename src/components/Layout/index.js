import React, {PureComponent} from 'react'
import {SideNavigation, TitleBar} from 'Components'
import styles from './styles.scss'

export default class Layout extends PureComponent {
  render() {
    const {children} = this.props

    return (
      <div className={styles.wrapper}>
        <SideNavigation />
        <div className={styles.rightContent}>
          {children}
        </div>
      </div>
    )
  }
}
