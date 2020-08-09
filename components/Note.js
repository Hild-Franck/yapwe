import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'

import { setData } from '../ducks/modal'

const useStyle = makeStyles(theme => ({
  important: {
    background: 'red',
    color: 'white',
    fontSize: 'bold'
  }
}))

const Note = ({ note }) => {
  const classes = useStyle()
  const className = note.important ? classes.important : ''
  console.log(note.important, className);
  return <div>
    <p className={className}>{`- ${note.text}`}</p>
  </div>
}

const mapStateToProps = (_, ownProps) => state => ({
  note: state.note.data[ownProps.id]
})

export default connect(mapStateToProps)(Note)