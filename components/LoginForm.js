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

const LoginForm = ({ handleSubmit, children, className = '', signupError }) => {
  return (
    <Form  noValidate autoComplete="off" onSubmit={handleSubmit}>
      <Field fullWidth label="Username" name="username" component={renderTextField} type="text" />
      <Field fullWidth label="Password" name="password" component={renderTextField} type="password" />
      <Button type="submit">Send</Button>
      {signupError && <Alert severity="error">{signupError.message}</Alert>}
      {children}
    </Form>
  )
}

LoginForm.propTypes = { ...propTypes }

export const formName = 'signupForm'

export default reduxForm({ form: formName })(LoginForm)