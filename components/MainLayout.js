import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
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
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import EmojiEmotions from '@material-ui/icons/EmojiEmotions'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MuiAlert from '@material-ui/lab/Alert'

import SignupForm from './SignupForm'
import LoginForm from './LoginForm'
import { signup, logout, login, removeMessage, addMessage, setUser } from '../ducks/main'

const Alert = props => <MuiAlert elevation={6} variant="filled" {...props} />

const ButtonLink = ({ className, href, hrefAs, to, children }) => (
  <Link href={href} as={hrefAs} to={to} prefetch>
    <a className={className}>
      {children}
    </a>
  </Link>
)

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
  const [open, setOpen] = React.useState('')
  const [openSnackbar, setOpenSnackbar] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const isMenuOpen = Boolean(anchorEl)
  const handleOpen = name => () => {
    setOpen(name)
  }

  const handleClose = () => {
    setOpen('')
  }

  const handleSignupSubmit = values => dispatch(signup(values)).then(() => {
    dispatch(addMessage('User created, you can now login !'))
    setOpen('')
  })

  const handleLoginSubmit = values => dispatch(login(values)).then(result => {
    localStorage.setItem("user", result.body.data)
    dispatch(addMessage('Logged in !'))
    setOpen('')
  })

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false)
    dispatch(removeMessage())
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    setAnchorEl(null)
    dispatch(logout()).then(() => {
      localStorage.removeItem('user')
    })
  }

  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  )

  if (!openSnackbar && props.notification.message) setOpenSnackbar(true)
  
  useEffect(() => {
    const user = localStorage.getItem('user')
    if (!props.auth.user && user) {
      dispatch(setUser(user))
    }
  })



  return (
    <div className={classes.root}>
      <CssBaseline />
      {props.notification.message && 
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity={props.notification.severity}>
            {props.notification.message}
          </Alert>
        </Snackbar>
      }
      <Modal
        className={classes.modal}
        open={Boolean(open)}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.paper}>
          {open == 'signup' && (<div>
            <h1>Signup</h1>
            <SignupForm onSubmit={handleSignupSubmit} signupError={props.auth.signupError} />
          </div>) || (<div>
            <h1>Login</h1>
            <LoginForm onSubmit={handleLoginSubmit} loginError={props.auth.loginError} />
          </div>)}
        </div>
      </Modal>
      <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
          <Typography variant="h6" className={classes.title} noWrap>
            YapWe
          </Typography>
          {!props.auth.user && (<div>
            <Button color="inherit" onClick={handleOpen('signup')}>Signup</Button>
            <Button color="inherit" onClick={handleOpen('login')}>Login</Button>
          </div>) || (
            <IconButton aria-controls={menuId} aria-haspopup="true" onClick={handleProfileMenuOpen}>
              <AccountCircle />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      {renderMenu}
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