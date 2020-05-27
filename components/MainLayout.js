import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import CssBaseline from '@material-ui/core/CssBaseline'
import Modal from '@material-ui/core/Modal'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Snackbar from '@material-ui/core/Snackbar'
import EmojiEmotions from '@material-ui/icons/EmojiEmotions'
import MuiAlert from '@material-ui/lab/Alert'

import SignupForm from './SignupForm'
import LoginForm from './LoginForm'
import UserMenu from './UserMenu'
import MainToolbar from './MainToolbar'
import { signup, logout, login, removeMessage, addMessage, setUser } from '../ducks/main'
import useStyles from './style/mainLayout'

const Alert = props => <MuiAlert elevation={6} variant="filled" {...props} />

const ButtonLink = ({ className, href, hrefAs, children }) => (
  <Link href={href} as={hrefAs} prefetch>
    <a className={className}>{children}</a>
  </Link>
)

const MainLayout = ({ children, dispatch, ...props }) => {
  const classes = useStyles()

  const [open, setOpen] = React.useState('')
  const [openSnackbar, setOpenSnackbar] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleOpen = name => () => setOpen(name)
  const handleClose = () => setOpen('')

  const onSignupSubmit = values => dispatch(signup(values)).then(() => {
    dispatch(addMessage('User created, you can now login !'))
    setOpen('')
  })

  const onLoginSubmit = values => dispatch(login(values)).then(result => {
    localStorage.setItem("user", result.body.data)
    dispatch(addMessage('Logged in !'))
    setOpen('')
  })

  const onSnackbarClose = () => {
    setOpenSnackbar(false)
    dispatch(removeMessage())
  }

  const handleMenuOpen = ({ currentTarget }) => setAnchorEl(currentTarget)
  const handleMenuClose = () => setAnchorEl(null)

  const handleLogout = () => {
    setAnchorEl(null)
    dispatch(logout()).then(() => localStorage.removeItem('user'))
  }

  const menuId = 'primary-search-account-menu'

  if (!openSnackbar && props.notification.message) setOpenSnackbar(true)
  
  useEffect(() => {
    const user = localStorage.getItem('user')
    if (!props.auth.user && user) dispatch(setUser(user))
  })

  return (
    <div className={classes.root}>
      <CssBaseline />
      {(({ message, severity }) => message &&
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={onSnackbarClose}>
          <Alert onClose={onSnackbarClose} severity={severity}>{message}</Alert>
        </Snackbar>
      )(props.notification)}
      <Modal
        className={classes.modal}
        open={Boolean(open)}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.paper}>
          {(({ signupError, loginError }) => open == 'signup' ? <div>
            <h1>Signup</h1>
            <SignupForm onSubmit={onSignupSubmit} err={signupError} />
          </div> : <div>
            <h1>Login</h1>
            <LoginForm onSubmit={onLoginSubmit} err={loginError} />
          </div>)(props.auth)}
        </div>
      </Modal>
      <AppBar position="fixed" className={classes.appBar}>
        <MainToolbar
          handleOpen={handleOpen}
          menuId={menuId}
          handleMenuOpen={handleMenuOpen}
        />
      </AppBar>
      <UserMenu
        anchorEl={anchorEl}
        menuId={menuId}
        isMenuOpen={Boolean(anchorEl)}
        handleMenuClose={handleMenuClose}
        handleLogout={handleLogout}
      />
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper, drawer: classes.drawer
        }}
      >
        <Toolbar />
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            <ListItem button key="Mood" component={ButtonLink} href="/mood">
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