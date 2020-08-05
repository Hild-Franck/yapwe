import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'

import { setData } from '../ducks/modal'

const SignupButton = ({ dispatch }) => <Button
  variant="contained"
  color="primary"
  onClick={() => dispatch(setData('signup', {}))}
>
  Signup
</Button>

SignupButton.propTypes = {
  dispatch: PropTypes.func
}

export default connect(null)(SignupButton)