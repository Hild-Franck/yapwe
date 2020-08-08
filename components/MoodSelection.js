import React, { useState } from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSmile, faDizzy, faGrin, faSurprise, faTired, faAngry, faSadTear, faMeh
} from '@fortawesome/free-regular-svg-icons'

import MoodDisplay from './MoodDisplay'
import { createMood, updateMood } from '../ducks/mood'

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
  acc[`arc-${i}`] = {
    "--rotation": `${-22.5 + (i - 1) * 45}deg`,
    "--color": `hsl(${mood.color}, 80%, 70%)`,
    "--color-border": `hsl(${mood.color}, 80%, 35%)`,
    position: "absolute",
    cursor: 'pointer',
    top: 0,
    right: 0,
    width: "50%",
    height: "50%",
    "transform-origin": "0% 100%",
    "background-image": `radial-gradient(circle at 0% 100%, transparent, transparent 19.5%, var(--color-border) 10%, var(--color-border) 20.5%, var(--color) 21%, var(--color) 50%, var(--color-border) 50.25%, var(--color-border) 51.5%, transparent 51.75%, transparent)`,
    "-webkit-clip-path": "polygon(0 0, 0 99%, 99% 0)",
    "clip-path": "polygon(0 0, 0 99%, 99% 0)",
    transform: "scale(1) rotate(var(--rotation))",
    transitionProperty: "transform, opacity",
		transitionDuration: "0.2s",
		// transitionTimingFunction: "cubic-bezier(0.4, -0.4, 0.7, -0.3)",
    "&:hover": {
      transform: "scale(1.1) rotate(var(--rotation)) !important"
    }
  }
  return acc
}, {
  wheel: {
    margin: 'auto',
    height: 500,
    width: 500,
    "transform-origin": "0% 0%",
    position: "relative"
  },
  fa: {
    width: "30% !important",
    transform: "rotate(calc(var(--rotation) * -1))",
    color: 'rgba(255, 255, 255, 0.8)',
    position: 'absolute',
    top: '37%',
    left: '4%',
    height: "auto",
    margin: "auto"
  },
  title: {
    textShadow: "black 2px 2px 2px",
    textAlign: "center",
    fontSize: theme.typography.h2.fontSize,
    fontWeight: 'bold',
    marginBottom: -40
  }
}))

const MoodSelection = ({ dispatch, closeModal, data }) => {
  const date = `${data.year}-${data.month}-${data.day}`
  const [desc, setDesc] = useState({desc: "Select mood", color: "black"})
  const classes = useStyles()
  return <div>
    <h1>Select {date} mood:</h1>
    <h2 className={classes.title} style={{color: `hsl(${(moodIcon[desc]||desc).color}, 80%, 70%)`}}>{(moodIcon[desc]||desc).desc.toUpperCase()}</h2>
    <div className={classes.wheel}>
      {moodIcon.map((mood, i) => <div key={i} className={classes[`arc-${i}`]} onClick={() => (dispatch((data.mood ? updateMood : createMood)(data.day, data.month, data.year, i)), closeModal()) } onMouseEnter={() => setDesc(i)} onMouseLeave={() => setDesc({desc: "Select mood", color: "black"})}>
        <FontAwesomeIcon className={classes.fa} icon={mood.icon} />
      </div>)}
    </div>
  </div>
}

export default connect(null)(MoodSelection)
