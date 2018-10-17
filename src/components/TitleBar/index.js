import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import styles from './styles.scss'

export default class TitleBar extends PureComponent {
  render() {
    const {title} = this.props

    return (
      <div className={styles.bar}>
        <h3 className={styles.title}>{title}</h3>
      </div>
    )
  }
}
