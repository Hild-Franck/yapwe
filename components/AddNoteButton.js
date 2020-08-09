import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd'

import { setData } from '../ducks/modal'

const AddNoteButton = ({ dispatch, year, month }) => <Button
  variant="contained"
  color="primary"
  startIcon={<PlaylistAddIcon>add</PlaylistAddIcon>}
  onClick={() => dispatch(setData('note', { date: new Date(year, month, new Date().getUTCDate()) }))}
>
  Add
</Button>

AddNoteButton.propTypes = {
  dispatch: PropTypes.func
}

export default connect(null)(AddNoteButton)