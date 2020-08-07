import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSmile, faGrinHearts, faGrin, faMehBlank, faFrown, faAngry, faSadTear
} from '@fortawesome/free-regular-svg-icons'

const useStyles = makeStyles(theme => ({
  paper: {
    height: '100px',
    width: '100px',
    textAlign: 'center',
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    cursor: 'pointer',
    position: "relative",
    fontSize: theme.typography.h5.fontSize
  },
  children: {
    position: "absolute",
    fontWeight: "bold",
    color: "white",
    textShadow: "black 2px 2px 2px",
    top: 2,
    right: 7,
    width: "100%",
    textAlign: "right"
  },
  fa: {
    width: "80% !important",
    height: "auto",
    margin: "auto"
  },
  '0': {
    backgroundColor: 'pink',
    color: 'white'
  },
  '1': {
    backgroundColor: 'green',
    color: 'white'
  },
  '2': {
    backgroundColor: 'lightgreen',
    color: 'white'
  },
  '3': {
    backgroundColor: 'azure'
  },
  '4': {
    backgroundColor: 'lightblue',
    color: 'white'
  },
  '5': {
    backgroundColor: 'red',
    color: 'white'
  },
  '6': {
    backgroundColor: 'blue',
    color: 'white'
  },
  default: {
    backgroundColor: 'lightgrey'
  }
}))

const moodIcon = [
  faGrinHearts, faGrin, faSmile, faMehBlank, faFrown, faAngry, faSadTear
]

const MoodDisplay = ({ score, children, ...props }) => {
  const classes = useStyles()
  const icon = moodIcon[score] || faSmile
  return <Grid item {...props}>
    <Paper className={`${classes.paper} ${classes[`${score}`]}`}>
      {score != undefined && <FontAwesomeIcon className={classes.fa} icon={icon} />}
      <div className={classes.children}>
        {children}
      </div>
    </Paper>
  </Grid>
}

export default MoodDisplay