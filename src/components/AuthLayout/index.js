import React, {PureComponent} from 'react'
import styles from './styles.scss'

export default class AuthLayout extends PureComponent {
  render() {
    const {children} = this.props

    return (
      <div className={styles.wrapper}>
        <div>Auth Layout</div>
        {children}
      </div>
    )
  }
}