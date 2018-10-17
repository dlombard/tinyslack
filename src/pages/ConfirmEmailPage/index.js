import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import {confirmUserEmail} from 'Actions/user'
import {AuthLayout} from 'Components'

class ConfirmEmailPage extends PureComponent {
  componentDidMount = async () => {
    const {confirmUserEmail, pushLocation} = this.props
    await confirmUserEmail()
    pushLocation('/login')
  }

  render() {
    return (
      <AuthLayout>
        <h1>Confirm Email Page</h1>
      </AuthLayout>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  const queryParams = new URLSearchParams(window.location.search)
  const tokenId = queryParams.get('tokenId')
  const token = queryParams.get('token')

  return {
    confirmUserEmail: () => dispatch(confirmUserEmail({token, tokenId})),
    pushLocation: (to) => dispatch(push(to)),
  }
}

export default connect(() => ({}), mapDispatchToProps)(ConfirmEmailPage)
