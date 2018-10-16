import Stitch from 'Stitch'
import {UserPasswordAuthProviderClient} from 'mongodb-stitch-browser-sdk'
import {USER__SIGN_UP} from 'Constants'

export const signUpUser = (data) => async (dispatch) => {
  const {email, password} = data
  const emailPassClient = Stitch.auth
    .getProviderClient(UserPasswordAuthProviderClient.factory)

  const signupReq = await emailPassClient.registerWithEmail(email, password)
  console.log(signupReq)
}
