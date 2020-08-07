import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import MoodDisplay from './MoodDisplay'
import { createMood, updateMood } from '../ducks/mood'

const moodScores = [...Array(7).keys()]

const MoodSelection = ({ dispatch, closeModal, data }) => {
  const date = `${data.year}-${data.month}-${data.day}`
  return <div>
    <h1>Select {date} mood:</h1>
    <Grid container spacing={3} justify="center" alignItems="center">
      {moodScores.map(s => <MoodDisplay key={s} score={s} onClick={() => dispatch(
        data.mood
          && updateMood(data.day, data.month, data.year, s)
          || createMood(data.day, data.month, data.year, s)
      ).then(() => closeModal())}>
      </MoodDisplay>)}
    </Grid>
  </div>
}

export default connect(null)(MoodSelection)
