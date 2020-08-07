import React, { useEffect, useState } from 'react'
import {connect} from 'react-redux'
import { pickBy, find } from 'lodash'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Modal from '@material-ui/core/Modal'

import Mood from '../components/Mood'
import { getMood, createMood, updateMood } from '../ducks/mood'

const dayInitial = ['M','T','W','T','F','S','S']
const moodScores = [...Array(5).keys()]

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
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalContent: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
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

const Moods = props => {
  const classes = useStyles()
  const [modal, setModal] = React.useState(null)

  const date = props.date
  const month = date.getUTCMonth()+1
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
  
  const handleOpen = (month, day, year) => () => {
    setModal({month, day, year})
  }
  const handleClose = () => {
    setModal(null)
  }

  return (
    <div>
      <Modal
        className={classes.modal}
        open={Boolean(modal)}
        onClose={handleClose}
        aria-labelledby="mood-modal-title"
        aria-describedby="mood-modal-description"
      >
        <div className={classes.modalContent}>
          <h1>
            Select {modal && new Date(modal.year, modal.month, modal.day).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} mood:
          </h1>
          <Grid container spacing={3} justify="center" alignItems="center">
            {moodScores.map(s => <Grid key={s} item onClick={() => props.dispatch(
              moods[modal.day]
                && updateMood(modal.day, modal.month, modal.year, s)
                || createMood(modal.day, modal.month, modal.year, s)
            ).then(setModal(null))}>
              <Paper className={`${classes.paper} ${classes[s]}`}></Paper>
            </Grid>)}
          </Grid>
        </div>
      </Modal>
      <h1>Mood</h1>
      <Grid container spacing={3} justify="center" alignItems="center">
        <Grid container item xs={12} spacing={3} justify="center">
          {dayInitial.map(v => <Grid key={v} item><Paper className={classes.paper}><span>{v}</span></Paper></Grid>)}
        </Grid>
        {weeks.map((week, i) => <Grid key={week+i} container item xs={12} spacing={3} justify="center">
          {week.map((day, j) => {
            const d = ((i*7)-startingDay)+j+1
            const id = (find(moods, mood => mood.day == d)||{}).id
            return <Mood key={id} id={id} day={d} displayDay={Boolean(day)} />
        })}
        </Grid>)}
      </Grid>
    </div>
  )
}

Moods.getInitialProps = ({store}) => {}

const mapStateToProps = state => ({ ids: state.mood.ids, date: state.mainReducer.date })

export default connect(mapStateToProps)(Moods)

