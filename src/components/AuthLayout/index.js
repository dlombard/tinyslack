import React, {PureComponent} from 'react'
import styles from './styles.scss'

export default class AuthLayout extends PureComponent {
  render() {
    const {children} = this.props

    return (
      <div className={styles.wrapper}>
        <img
          className={styles.logo}
          src="/images/mongoslack.svg"
          alt="Monoslack Logo" />

        <section className={styles.content}>
          {children}
        </section>
      </div>
    )
  }
}
