import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import { setData } from '../ducks/modal'

const useStyle = makeStyles(theme => ({
  note: {
    padding: 3
  },
  content: {
    display: 'inline-block',
    borderRadius: 5,
    cursor: 'pointer',
    padding: 3,
      border: "1px transparent solid",
    '&:hover': {
      border: "1px lightgrey solid"
    }
  },
  hyphen: {
    fontSize: theme.typography.h4.fontSize,
    verticalAlign: 'sub'
  },
  important: {
    background: '#e74c3c',
    color: 'white',
    fontWeight: 'bold',
    padding: 3,
    '&:hover': {
      background: "transparent",
      color: "#e74c3c"
    }
  }
}))

const Note = ({ note, dispatch }) => {
  const classes = useStyle()
  const className = `${classes.content} ${note.important ? classes.important : ''}`
  return <div className={classes.note}>
    <Typography>
      - <span onClick={() => dispatch(setData("note", note))} className={className}>{note.text}</span>
    </Typography>
  </div>
}

const mapStateToProps = (_, ownProps) => state => ({
  note: state.note.data[ownProps.id]
})

export default connect(mapStateToProps)(Note)