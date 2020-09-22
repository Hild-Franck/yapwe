import React from 'react'
import { connect } from 'react-redux'
import { Field, Form, reduxForm } from 'redux-form'
import 'date-fns'
import Button from '@material-ui/core/Button'

import Input from './Input'
import { createHabit } from '../ducks/habit'

const NoteForm = ({ handleSubmit, dispatch, closeModal }) => {
  const onSubmit = ({ desc }) => {
    dispatch(createHabit(desc))
    closeModal()
  }

  return <Form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
    <Field fullWidth label="Description" name="desc" component={Input} type="text" />
    <p>
      <Button type="submit">Send</Button>
    </p>
  </Form>
}

export default connect(null)(reduxForm({ form: 'user' })(NoteForm))