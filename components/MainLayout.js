import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import EmojiEmotions from '@material-ui/icons/EmojiEmotions'
import MuiAlert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'

import SignupForm from './SignupForm'
import { signup, removeMessage } from '../ducks/main'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    flexGrow: 1,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}))

const MainLayout = ({ children, dispatch, ...props }) => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const [openSnackbar, setOpenSnackbar] = React.useState(false)
  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = values => dispatch(signup(values)).then(() => {
    setOpen(false)
  })

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false)
    dispatch(removeMessage())
  }

  if (!openSnackbar && props.notification.message) setOpenSnackbar(true)

  return (
    <div className={classes.root}>
      <CssBaseline />
      {props.notification.message && 
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity="success">
            {props.notification.message}
          </Alert>
        </Snackbar>
      }
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.paper}>
          <h1>Signup</h1>
          <SignupForm onSubmit={handleSubmit} pouet={props.auth.signupError} />
        </div>
      </Modal>
      <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
          <Typography variant="h6" className={classes.title} noWrap>
            YapWe
          </Typography>
          <Button color="inherit" onClick={handleOpen}>Signup</Button>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            <ListItem button key="Mood">
              <ListItemIcon><EmojiEmotions /></ListItemIcon>
              <ListItemText primary="Mood" />
            </ListItem>
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        {children}
      </main>
    </div>
  )
}

const mapStateToProps = state => state.mainReducer

export default connect(mapStateToProps)(MainLayout)