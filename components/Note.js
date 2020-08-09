import React from 'react'
import { connect } from 'react-redux'

import { setData } from '../ducks/modal'

const Note = ({ note }) => {
  return <div>
    <p>{`- ${note.text}`}</p>
  </div>
}

const mapStateToProps = (_, ownProps) => state => ({
  note: state.note.data[ownProps.id]
})

export default connect(mapStateToProps)(Note)