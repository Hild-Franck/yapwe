import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Modal from '@material-ui/core/Modal'
import Paper from '@material-ui/core/Paper'

import useStyles from './style/modal'
import { close } from '../ducks/modal'
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'
import MoodSelection from './MoodSelection'
import NoteForm from './NoteForm'
import HabitForm from './HabitForm'

const modalType = {
  signup: SignupForm,
  login: LoginForm,
  mood: MoodSelection,
  note: NoteForm,
  habit: HabitForm
}


const SimpleModal = ({ modal, dispatch }) => {
  const classes = useStyles()

  const closeModal = () => dispatch(close())

  const Component = modalType[modal.type]
  
  return <Modal
    className={classes.root}
    open={Boolean(modal.data)}
    onClose={closeModal}
    aria-labelledby="modal-title"
    aria-describedby="modal-description"
  >
    <Paper className={classes.paper}>
      <h1>{modal.type.slice(0,1).toUpperCase()+modal.type.slice(1)}</h1>
      {modal.data &&
        <Component data={modal.data} closeModal={closeModal} />
      }
    </Paper>
  </Modal>
}

SimpleModal.propTypes = {
  modal: PropTypes.object,
  dispatch: PropTypes.func
}

const mapStateToProps = state => ({ modal: state.modal })

export default connect(mapStateToProps)(SimpleModal)