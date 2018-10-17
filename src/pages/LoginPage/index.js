import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import {logInUser} from 'Actions/user'
import {AuthLayout} from 'Components'
import styles from './styles.scss'

class LoginPage extends PureComponent {
  state = {
    email: '',
    password: '',
  }

  render() {
    const {email, password} = this.state

    return (
      <AuthLayout>
        <h1>Log In</h1>
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
      </AuthLayout>
    )
  }

  onChange = (e) => {
    const {name, value} = e.target

    this.setState({[name]: value})
  }

  onSubmit = async (e) => {
    const {email, password} = this.state
    const {logInUser, pushLocation} = this.props

    e.preventDefault()

    await logInUser({email, password})
    pushLocation('/')
  }
}

const mapDispatchToProps = (dispatch) => ({
  logInUser: (data) => dispatch(logInUser(data)),
  pushLocation: (to) => dispatch(push(to)),
})

export default connect(() => ({}), mapDispatchToProps)(LoginPage)
