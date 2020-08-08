import React from 'react'
import { connect } from 'react-redux'

import MoodDisplay from './MoodDisplay'
import { setData } from '../ducks/modal'

const Mood = ({ mood, date, displayDay, dispatch }) => {
  return displayDay
    ? <MoodDisplay score={mood && mood.score} onClick={() => dispatch(setData('mood', { ...date, mood }))}>
      {mood ? mood.day : displayDay && date.day}
    </MoodDisplay>
    : <MoodDisplay score="default" />
}

const mapStateToProps = (_, ownProps) => state => ({
  mood: state.mood.data[ownProps.id]
})

export default connect(mapStateToProps)(Mood)