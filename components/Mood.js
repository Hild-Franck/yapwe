import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

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

const moods = [

]

const Mood = ({ mood, day, displayDay }) => {
  const classes = useStyles()
  return <Grid item><Paper className={`${classes.paper} ${mood && classes[`${mood.score}`]}`}>
    {mood ? mood.day : displayDay && day}
  </Paper></Grid>
}

const mapStateToProps = (_, ownProps) => state => ({
  mood: state.mood.data[ownProps.id]
})

export default connect(mapStateToProps)(Mood)