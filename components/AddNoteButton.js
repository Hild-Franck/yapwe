import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import PersonAddIcon from '@material-ui/icons/PersonAdd'

import { setData } from '../ducks/modal'

const AddNoteButton = ({ dispatch, year, month }) => <Button
  variant="contained"
  color="primary"
  startIcon={<PersonAddIcon>add</PersonAddIcon>}
  onClick={() => dispatch(setData('note', { date: new Date(year, month, new Date().getUTCDate()) }))}
>
  Add
</Button>

AddNoteButton.propTypes = {
  dispatch: PropTypes.func
}

export default connect(null)(AddNoteButton)