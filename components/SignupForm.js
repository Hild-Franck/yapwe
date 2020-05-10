import React, { PureComponent } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { Field, reduxForm, propTypes } from 'redux-form'

const required = value => (value ? undefined : 'Required')

const SignupForm = ({ handleSubmit, children, className = '', error }) => {
  return (
    <form noValidate autoComplete="off">
      <Field fullWidth label="Username" name="firstName" component={TextField} type="text" />
      <Field fullWidth label="Password" name="lastName" component={TextField} type="password" />
      <Button>Send</Button>
      {children}
    </form>
  )
}

SignupForm.propTypes = { ...propTypes }

export const formName = 'signupForm'

export default reduxForm({ form: formName })(SignupForm)