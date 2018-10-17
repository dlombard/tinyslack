import React, {PureComponent} from 'react'
import styles from './styles.scss'

export default class TextInput extends PureComponent {
  render() {
    const {
      label,
      name,
      type = 'text',
      onChange,
      value,
      placeholder,
    } = this.props

    return (
      <fieldset className={styles.fieldset}>
        <label
          className={styles.label}
          htmlFor={name}>
          {label}
        </label>

        <input
          className={styles.input}
          onChange={onChange}
          value={value}
          type={type}
          name={name}
          placeholder={placeholder} />
      </fieldset>
    )
  }
}