import React, {PureComponent} from 'react'
import styles from './styles.scss'

export default class TitleBar extends PureComponent {
  render() {
    return <div className={styles.bar}>Title Bar</div>
  }
}
