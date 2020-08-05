import React from 'react'
import { reduxForm } from 'redux-form'
import TextField from '@material-ui/core/TextField'

const Input = ({ input, meta: { touched, error }, ...props }) => <TextField
  errorText={touched && error}  
  {...input}
  {...props}
/>

Input.propTypes = { ...reduxForm.propTypes }

export default Input