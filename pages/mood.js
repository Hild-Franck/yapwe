import React, { useEffect, useState } from 'react'
import {connect} from 'react-redux'
import { pickBy, find } from 'lodash'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import Mood from '../components/Mood'
import { getMood } from '../ducks/mood'

const dayInitial = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']

const useStyles = makeStyles(theme => ({
  paper: {
    height: '100px',
    width: '100px',
    fontWeight: "bold",
    fontSize: theme.typography.h5.fontSize,
    textAlign: 'center',
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    cursor: 'pointer'
  }
}))

const Moods = props => {
  const classes = useStyles()

  const date = props.date
  const month = date.getUTCMonth()
  const year = date.getUTCFullYear()

  useEffect(() => {
    props.dispatch(getMood(month, year))
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
  
  const moods = pickBy(props.ids, mood => mood.month == month && mood.year == year)
  
  return (
    <div>
      <h1>Mood</h1>
      <Grid container spacing={3} justify="center" alignItems="center">
        <Grid container item xs={12} spacing={3} justify="center">
          {dayInitial.map(v => <Grid key={v} item><Paper className={classes.paper}><span>{v}</span></Paper></Grid>)}
        </Grid>
        {weeks.map((week, i) => <Grid key={week+i} container item xs={12} spacing={3} justify="center">
          {week.map((day, j) => {
            const d = ((i*7)-startingDay)+j+1
            const id = (find(moods, mood => mood.day == d)||{}).id
            return <Mood key={id} id={id} date={{ day: d, month, year }} displayDay={Boolean(day)} />
        })}
        </Grid>)}
      </Grid>
    </div>
  )
}

Moods.getInitialProps = ({store}) => {}

const mapStateToProps = state => ({ ids: state.mood.ids, date: state.mainReducer.date })

export default connect(mapStateToProps)(Moods)

