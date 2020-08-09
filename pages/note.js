import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { groupBy, map } from 'lodash'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import { getNote } from '../ducks/note'
import AddNoteButton from '../components/AddNoteButton'
import Note from '../components/Note'

const Notes = props => {
  const date = props.date
  const month = date.getUTCMonth()
  const year = date.getUTCFullYear()

  useEffect(() => {
    props.dispatch(getNote(month+1, year))
  }, [month, year])

  const notes = groupBy(
    props.ids.filter(id => id.month == month+1 && id.year == year),
    'day'
  )
  return (
    <div>
      <h1>Notes</h1>
      <AddNoteButton month={month} year={year} />
      {map(notes, (note, day) => <div>
        <h2>{Intl.DateTimeFormat(undefined, { day: 'numeric', month: 'long' }).format(new Date(year, month, day))}</h2>
        {note.map(({ id }) => <Note id={id} />)}
      </div>)}
    </div>
  )
}

Notes.getInitialProps = ({store}) => {}

const mapStateToProps = state => ({ ids: state.note.ids, date: state.mainReducer.date })

export default connect(mapStateToProps)(Notes)

