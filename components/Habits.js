import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import { updateHabit } from '../ducks/habit'

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
  },
  done: {
    backgroundColor: theme.palette.success.main,
    color: "white"
  },
  desc: {
    width: 200,
    textAlign: "right",
    padding: 10
  }
}))

const Habits = ({ dispatch, date, habit, week, i, startingDay, id }) => {
  const classes = useStyles()
  const month = date.getUTCMonth()
  const year = date.getUTCFullYear()
  const onClick = (day, done) => () => {
    dispatch(updateHabit(day, month, year, id, !done))
  }
  return <Grid container alignItems="center" justify="center">
    <Typography variant="h5" className={classes.desc}>{habit.desc}</Typography>
    {week.map((day, j) => {
      const date = new Date(year, month, ((i*7)-startingDay)+j+1).getTime()
      const done = (d => Boolean(d) && d.done)(habit.dates[date])
      return <Paper onClick={onClick(((i*7)-startingDay)+j+1, done)} key={`${id}${date}`} className={`${classes.paper} ${done && classes.done}`}>
        <span>
          {Boolean(day) && ((i*7)-startingDay)+j+1}
        </span>
      </Paper>
    })}
  </Grid>
}

Habits.propTypes = {
  habit: PropTypes.object,
  week: PropTypes.array,
  i: PropTypes.number,
  startingDay: PropTypes.number,
  id: PropTypes.string
}

const mapStateToProps = (_, ownProps) => state => ({
  habit: state.habit.data[ownProps.id],
  date: state.mainReducer.date
})

export default connect(mapStateToProps)(Habits)