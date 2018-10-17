import React, {PureComponent} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {signUpUser} from 'Actions/user'
import {AuthLayout, TextInput, Button} from 'Components'
import styles from './styles.scss'

class SignupPage extends PureComponent {
  state = {
    email: '',
    password: '',
  }

  render() {
    const {email, password} = this.state

    return (
      <AuthLayout>
        <h1>Sign Up</h1>

        <form className={styles.form} onSubmit={this.onSubmit}>
          <TextInput
            name='email'
            type='email'
            value={email}
            onChange={this.onChange}
            label='Email'
            placeholder='johnnyappleseed@email.com' />

          <TextInput
            name='password'
            type='password'
            value={password}
            onChange={this.onChange}
            label='Password'
            placeholder='Enter a secure password' />

          <Button type='submit'>Sign Up</Button>
        </form>

        <p>Already have an account? <Link to='/login'>Log in</Link> here.</p>
      </AuthLayout>
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
