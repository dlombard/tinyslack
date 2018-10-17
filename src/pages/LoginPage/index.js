import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {push} from 'react-router-redux'
import {logInUser} from 'Actions/user'
import {AuthLayout, TextInput, Button} from 'Components'
import styles from './styles.scss'

class LoginPage extends PureComponent {
  state = {
    email: '',
    password: '',
    error: null,
  }

  render() {
    const {email, password, error} = this.state

    return (
      <AuthLayout>
        <h1>Log In</h1>

        {error &&
          <div>Invalid login</div>
        }

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

          <Button type='submit'>Log In</Button>
        </form>

        <p>Don't have an account yet? <Link to='/signup'>Sign up</Link> instead!</p>
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

    try {
      await logInUser({email, password})
      pushLocation('/')
    }
    catch (error) {
      this.setState({error})
    }
  }
}

const mapDispatchToProps = (dispatch) => ({
  logInUser: (data) => dispatch(logInUser(data)),
  pushLocation: (to) => dispatch(push(to)),
})

export default connect(() => ({}), mapDispatchToProps)(LoginPage)
