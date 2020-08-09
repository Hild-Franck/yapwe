import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Field, FieldArray, Form, reduxForm } from 'redux-form'
import 'date-fns'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers'

import Input from './Input'
import { createNote } from '../ducks/note'

const NoteForm = ({ handleSubmit, dispatch, closeModal }) => {
  const day = (d => `${d<10?'0':''}${d}`)(new Date().getDate())
  const [selectedDate, setSelectedDate] = React.useState(new Date(2020,7, day))
  const handleDateChange = (date) => {
    setSelectedDate(date)
  }
  const onSubmit = ({ text }) => {
    const d = selectedDate.getDate()
    const m = selectedDate.getMonth()
    const y = selectedDate.getFullYear()
    console.log(d, m, y, text);
    dispatch(createNote(d, m, y, text))
    closeModal()
  }
  return <Form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="yyyy-MM-dd"
          margin="normal"
          id="date-picker-inline"
          label="Note day"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
    <Field fullWidth label="Note" name="text" component={Input} type="text" />
    <Button type="submit">Send</Button>
  </Form>
}

export default connect(null)(reduxForm({ form: 'user' })(NoteForm))