import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import MuiAlert from '@material-ui/lab/Alert'
import { Field, Form, reduxForm, propTypes } from 'redux-form'

const Alert = props => <MuiAlert elevation={6} variant="filled" {...props} />

const renderTextField = (
  { input, ...rest },
) => (
  <TextField
    {...input}
    {...rest}
  />
)

const SignupForm = ({ handleSubmit, children, className = '', pouet }) => {
  console.log("error", pouet);
  
  return (
    <Form  noValidate autoComplete="off" onSubmit={handleSubmit}>
      <Field fullWidth label="Username" name="username" component={renderTextField} type="text" />
      <Field fullWidth label="Password" name="password" component={renderTextField} type="password" />
      <Field fullWidth label="Email" name="email" component={renderTextField} type="email" />
      <Button type="submit">Send</Button>
      {pouet && <Alert severity="error">{pouet.response.body.message}</Alert>}
      {children}
    </Form>
  )
}

SignupForm.propTypes = { ...propTypes }

export const formName = 'signupForm'

export default reduxForm({ form: formName })(SignupForm)