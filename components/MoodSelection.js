import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import { createMood, updateMood } from '../ducks/mood'

const useStyles = makeStyles(theme => ({
  paper: {
    height: '100px',
    width: '100px',
    textAlign: 'center',
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    cursor: 'pointer'
  },
  '0': {
    backgroundColor: 'green'
  },
  '1': {
    backgroundColor: 'lightgreen'
  },
  '2': {
    backgroundColor: 'azure'
  },
  '3': {
    backgroundColor: 'lightblue'
  },
  '4': {
    backgroundColor: 'blue'
  },
  default: {
    backgroundColor: 'lightgrey'
  }
}))

const moodScores = [...Array(7).keys()]

const MoodSelection = ({ dispatch, closeModal, data }) => {
  const classes = useStyles()
  const date = `${data.year}-${data.month}-${data.day}`
  return <div className={classes.modalContent}>
    <h1>Select {date} mood:</h1>
    <Grid container spacing={3} justify="center" alignItems="center">
      {moodScores.map(s => <Grid key={s} item onClick={() => dispatch(
        data.mood
          && updateMood(data.day, data.month, data.year, s)
          || createMood(data.day, data.month, data.year, s)
      ).then(() => closeModal())}>
        <Paper className={`${classes.paper} ${classes[s]||classes.default}`}></Paper>
      </Grid>)}
    </Grid>
  </div>
}

export default connect(null)(MoodSelection)
