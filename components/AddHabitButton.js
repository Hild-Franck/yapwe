import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd'

import { setData } from '../ducks/modal'

const AddHabitButton = ({ dispatch }) => <Button
  variant="contained"
  color="primary"
  startIcon={<PlaylistAddIcon>add</PlaylistAddIcon>}
  onClick={() => dispatch(setData('habit', {}))}
>
  Add
</Button>

AddHabitButton.propTypes = {
  dispatch: PropTypes.func
}

export default connect(null)(AddHabitButton)