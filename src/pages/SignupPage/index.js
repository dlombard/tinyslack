import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {signUpUser} from 'Actions/user'
import styles from './styles.scss'

class SignupPage extends PureComponent {
  state = {
    email: '',
    password: '',
  }

  render() {
    const {email, password} = this.state

    return (
      <div className={styles.wrapper}>
        <span>{email},{password}</span>
        <form className={styles.form} onSubmit={this.onSubmit}>
          <fieldset className={styles.fieldset}>
            <label htmlFor='email'>Email</label>
            <input onChange={this.onChange} value={email} type='email' name='email' />
          </fieldset>

          <fieldset className={styles.fieldset}>
            <label htmlFor='password'>Password</label>
            <input onChange={this.onChange} value={password} type='password' name='password' />
          </fieldset>

          <button type='submit'>Sign Up</button>
        </form>
      </div>
    )
  }

  onChange = (e) => {
    const {name, value} = e.target

    this.setState({[name]: value})
  }

  onSubmit = (e) => {
    const {email, password} = this.state
    const {signUpUser} = this.props

    e.preventDefault()

    signUpUser({email, password})
  }
}

const mapDispatchToProps = (dispatch) => ({
  signUpUser: (data) => dispatch(signUpUser(data)),
})

export default connect(() => ({}), mapDispatchToProps)(SignupPage)
