import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Field, FieldArray, Form, reduxForm } from 'redux-form'
import 'date-fns'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Grid from '@material-ui/core/Grid'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'

import Input from './Input'
import { createNote, updateNote, deleteNote } from '../ducks/note'

const CheckBoxInput = props => <FormControlLabel
  control={<Input component={Checkbox} {...props} checked={props.input.value} />}
  label={props.label}
/>

const DatePicker = props => <Input component={props => <MuiPickersUtilsProvider utils={DateFnsUtils}>
  <Grid container justify="space-around">
    <KeyboardDatePicker
      {...props}
      disableToolbar
      autoOk
      variant="inline"
      format="yyyy-MM-dd"
      margin="normal"
      id="date-picker-inline"
      label="Note day"
      KeyboardButtonProps={{ 'aria-label': 'change date' }}
    />
  </Grid>
</MuiPickersUtilsProvider>} {...props} />

const NoteForm = ({ handleSubmit, dispatch, closeModal, initialValues }) => {
  const day = (d => `${d<10?'0':''}${d}`)(new Date().getDate())
  const [selectedDate, setSelectedDate] = React.useState(new Date(2020,7, day))
  const handleDateChange = (date) => {
    setSelectedDate(date)
  }
  const onSubmit = ({ text, important, date }) => {
    const d = date.getDate()
    const m = date.getMonth()
    const y = date.getFullYear()
    const func = initialValues._id
      ? updateNote(initialValues._id, text, important)
      : createNote(d, m, y, text, important)

    dispatch(func)
    closeModal()
  }

  return <Form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
    <Field fullWidth name="date" component={DatePicker} />
    <Field fullWidth label="Note" name="text" component={Input} type="text" />
    <Field label="Important" name="important" component={CheckBoxInput} />
    <p>
      <Button type="submit">Send</Button>
      {initialValues._id && 
        <Button
          onClick={() => (dispatch(deleteNote(initialValues._id)), closeModal())}
          color="secondary"
          variant="contained"
        >
        Delete
        </Button>
      }
    </p>
  </Form>
}

const formatDate = date => {
  const d = date.getUTCDate()
  const m = date.getUTCMonth()
  const y = date.getUTCFullYear()
  return new Date(y, m, d)
}

const mapStateToProps = (_, ownProps) => ({
  initialValues: { important: false, ...ownProps.data, date: formatDate(new Date(ownProps.data.date)) }
})

export default connect(mapStateToProps)(reduxForm({ form: 'user' })(NoteForm))