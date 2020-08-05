import React from 'react'
import Button from '@material-ui/core/Button'
import { Field, Form, reduxForm, propTypes } from 'redux-form'

import Input from './Input'
import { signup, addMessage } from '../ducks/main'


const SignupForm = ({ handleSubmit, dispatch, closeModal }) => {
  const onSubmit = values => dispatch(signup(values).then(result => {
    dispatch(addMessage("Your account has been created ! You can now log in."))
    closeModal()
  }))

  return <Form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
    <Field fullWidth label="Username" name="username" component={Input} type="text" />
    <Field fullWidth label="Password" name="password" component={Input} type="password" />
    <Field fullWidth label="Email" name="email" component={Input} type="email" />
    <Button type="submit">Send</Button>
  </Form>
}

SignupForm.propTypes = { ...propTypes }

export const formName = 'signupForm'

export default reduxForm({ form: formName })(SignupForm)