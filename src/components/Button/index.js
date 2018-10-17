import React, {PureComponent} from 'react'
import styles from './styles.scss'

export default class Button extends PureComponent {
  render() {
    const {children, onClick, type} = this.props
    return (
      <button
        className={styles.button}
        type={type}
        onClick={onClick && onClick}>
        {children}
      </button>
    )
  }
}
