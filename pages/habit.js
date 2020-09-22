import React, { useEffect, useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import {connect} from 'react-redux'
import { pickBy, find } from 'lodash'
import AddHabitButton from '../components/AddHabitButton'
import SwipeableViews from 'react-swipeable-views'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import { getHabits } from '../ducks/habit'
import HabitWeek from '../components/Habits'

const dayInitial = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']

const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: 0
  },
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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  }
}

const Habits = props => {
  const classes = useStyles()
  const theme = useTheme()
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleChangeIndex = (index) => {
    setValue(index)
  }

  const date = props.date
  const month = date.getUTCMonth()
  const year = date.getUTCFullYear()

  useEffect(() => {
    props.dispatch(getHabits(month+1, year))
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
  
  return (
    <div>
      <h1>Habit</h1>
      <AddHabitButton />
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        aria-label="full width tabs example"
      >
        {weeks.map((_, week) => <Tab key={week} label={`Week ${week+1}`} {...a11yProps(week)} />)}
      </Tabs>
      <Grid justify="center" container item direction="row">
        <div style={{width:200}}></div>
        {dayInitial.map(v => <Grid key={v} item><Paper className={classes.paper}><span>{v}</span></Paper></Grid>)}
      </Grid>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {weeks.map((week, i) => <TabPanel key={i} value={value} index={i}><Grid justify="center" container item direction="row">
          {props.ids.map(id => <HabitWeek key={id} id={id} week={week} i={i} startingDay={startingDay} /> )}
        </Grid></TabPanel>)}
      </SwipeableViews>
    </div>
  )
}

Habits.getInitialProps = ({store}) => {}

const mapStateToProps = state => ({ ids: state.habit.ids, date: state.mainReducer.date })

export default connect(mapStateToProps)(Habits)

