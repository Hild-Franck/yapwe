import React, { useEffect } from 'react'
import {connect} from 'react-redux'
import { pickBy } from 'lodash'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import { getMood } from '../ducks/mood'
import { addMessage } from '../ducks/main'

const dayInitial = ['M','T','W','T','F','S','S']

const useStyles = makeStyles(theme => ({
  paper: {
    height: '100px',
    width: '100px',
    textAlign: 'center',
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  '1': {
    backgroundColor: 'lightgreen'
  },
  default: {
    backgroundColor: 'lightgrey'
  }
}))

const Mood = props => {
  const classes = useStyles()
  const date = props.date
  const month = date.getMonth()
  const year = date.getFullYear()
  
  useEffect(() => {
    props.dispatch(getMood(month, year)).catch(e => {
      props.dispatch(addMessage(e.message, 'error'))
    })

  }, [month, year])

  const startingDay = new Date(year, month, 0).getDay()
  const numberOfDays = new Date(year, month+1, 0).getDate()
  const numberOfWeeks = Math.ceil((numberOfDays+startingDay)/7)-2
  const weeks = Array(numberOfWeeks).fill(Array(7).fill(true))
  weeks.unshift(Array(startingDay).fill().concat(Array(7-startingDay).fill(true)))
  const weekEnd = (numberOfDays+startingDay)%7
  weekEnd == 0
    && weeks.push(Array(7).fill(true))
    || weeks.push(Array(weekEnd).fill(true).concat(Array(7-weekEnd).fill()))
  
  const moods = pickBy(props.mood.data, mood => mood.day.getMonth() == month && mood.day.getFullYear() == year)
  console.log(moods)
  
  return (
    <div>
      <h1>Mood</h1>
      <Grid container spacing={3} justify="center" alignItems="center">
        <Grid container item xs={12} spacing={3} justify="center">
          {dayInitial.map(v => <Grid item><Paper className={classes.paper}><span>{v}</span></Paper></Grid>)}
        </Grid>
        {weeks.map((week, i) => <Grid container item xs={12} spacing={3} justify="center">
          {week.map((day, j) => <Grid item><Paper className={`${classes.paper} ${moods[((i*7)-startingDay)+j+1] && classes[moods[((i*7)-startingDay)+j+1].score] || classes.default}`}>
            {day && ((i*7)-startingDay)+j+1}
          </Paper></Grid>)}
        </Grid>)}
      </Grid>
    </div>
  )
}

Mood.getInitialProps = ({store}) => {}

const mapStateToProps = state => ({ mood: state.mood, date: state.mainReducer.date })

export default connect(mapStateToProps)(Mood)

