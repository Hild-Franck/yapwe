import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import CssBaseline from '@material-ui/core/CssBaseline'
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

import UserMenu from './UserMenu'
import MainToolbar from './MainToolbar'
import { logout, removeMessage, setUser } from '../ducks/main'
import useStyles from './style/mainLayout'

const Alert = props => <MuiAlert elevation={6} variant="filled" {...props} />

const ButtonLink = ({ className, href, hrefAs, children }) => (
  <Link href={href} as={hrefAs} prefetch>
    <a className={className}>{children}</a>
  </Link>
)

const MainLayout = ({ children, dispatch, ...props }) => {
  const classes = useStyles()

  const [openSnackbar, setOpenSnackbar] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null)

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
    try {
      const user = JSON.parse(localStorage.getItem('user') || '""')
      if (!props.auth.user && user) dispatch(setUser(user))
    } catch (e) {
      localStorage.removeItem('user')
      dispatch(setUser(null))
    }
  })

  return (
    <div className={classes.root}>
      <CssBaseline />
      {(({ message, severity }) => message &&
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={onSnackbarClose}>
          <Alert onClose={onSnackbarClose} severity={severity}>{message}</Alert>
        </Snackbar>
      )(props.notification)}
      <AppBar position="fixed" className={classes.appBar}>
        <MainToolbar
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