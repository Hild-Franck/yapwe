import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import MuiAlert from '@material-ui/lab/Alert'
import { Field, Form, reduxForm, propTypes } from 'redux-form'

const Alert = props => <MuiAlert elevation={6} variant="filled" {...props} />

const InputField = ({ input, ...rest }) => <TextField {...input} {...rest} />

const LoginForm = ({ handleSubmit, children, className = '', err }) =>
  <Form  noValidate autoComplete="off" onSubmit={handleSubmit}>
    <Field fullWidth label="Username" name="username" component={InputField} type="text" />
    <Field fullWidth label="Password" name="password" component={InputField} type="password" />
    <Button type="submit">Send</Button>
    {err && <Alert severity="error">{err.message}</Alert>}
    {children}
  </Form>

LoginForm.propTypes = { ...propTypes }

export const formName = 'loginForm'

export default reduxForm({ form: formName })(LoginForm)