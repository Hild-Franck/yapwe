import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import Button from '@material-ui/core/Button'
import AccountCircle from '@material-ui/icons/AccountCircle'

import { previousMonth, nextMonth, previousYear, nextYear } from '../ducks/main'
import useStyles from './style/mainToolbar'

const MainToolbar = ({ dispatch, ...props}) => {
  const classes = useStyles()

  const handlePreviousMonth = () => dispatch(previousMonth())
  const handleNextMonth = () => dispatch(nextMonth())

  const handlePreviousYear = () => dispatch(previousYear())
  const handleNextYear = () => dispatch(nextYear())

  return <Toolbar>
    <Typography variant="h6" className={classes.title} noWrap>
      YapWe
    </Typography>
    <div className={classes.date}>
      <p>
        <IconButton onClick={handlePreviousMonth}><ArrowBackIosIcon /></IconButton>
        {props.date.toLocaleString('default', { month: 'long' }).toUpperCase()}
        <IconButton onClick={handleNextMonth}><ArrowForwardIosIcon /></IconButton>
      </p>
      <p>
        <IconButton onClick={handlePreviousYear}><ArrowBackIosIcon /></IconButton>
        {props.date.toLocaleString('default', { year: 'numeric' })}
        <IconButton onClick={handleNextYear}><ArrowForwardIosIcon /></IconButton>
      </p>
    </div>
    {!props.auth.user && (<div  className={classes.user}>
      <Button color="inherit" onClick={props.handleOpen('signup')}>Signup</Button>
      <Button color="inherit" onClick={props.handleOpen('login')}>Login</Button>
    </div>) || (<div  className={classes.user}>
      <IconButton aria-controls={props.menuId} aria-haspopup="true" onClick={props.handleMenuOpen}>
        <AccountCircle />
      </IconButton>
      <span>{props.auth.user.username}</span>
      </div>)}
  </Toolbar>
}

const mapStateToProps = state => state.mainReducer

export default connect(mapStateToProps)(MainToolbar)