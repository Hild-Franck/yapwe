import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSmile, faDizzy, faGrin, faSurprise, faTired, faAngry, faSadTear, faMeh
} from '@fortawesome/free-regular-svg-icons'

const moodIcon = [
  { icon: faMeh, color: 30, desc: "Anticipative" },
  { icon: faGrin, color: 60, desc: "Joyful" },
  { icon: faSmile, color: 100, desc: "Trustful" },
  { icon: faDizzy, color: 165, desc: "Fearful" },
  { icon: faSurprise, color: 200, desc: "Surprised" },
  { icon: faSadTear, color: 240, desc: "Sad" },
  { icon: faTired, color: 270, desc: "Disgusted" },
  { icon: faAngry, color: 360, desc: "Angry" }
]

const useStyles = makeStyles(theme => moodIcon.reduce((acc, mood, i) => {
    acc[`${i}`] = { backgroundColor: `hsl(${mood.color}, 80%, 70%)` }
    return acc
  }, {
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
    color: 'rgba(255, 255, 255, 0.8)',
    height: "auto",
    margin: "auto"
  },
  default: {
    backgroundColor: 'lightgrey'
  }
}))

const MoodDisplay = ({ score, children, ...props }) => {
  const classes = useStyles()
  const icon = (moodIcon[score] && moodIcon[score].icon) || null
  return <Grid item {...props}>
    <Paper className={`${classes.paper} ${classes[`${score}`]}`}>
      {!Number.isNaN(Number(score))
        ? <FontAwesomeIcon className={classes.fa} icon={icon} />
        : null
      }
      <div className={classes.children}>
        {children}
      </div>
    </Paper>
  </Grid>
}

export default MoodDisplay