import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
  },
  user: {
    flexGrow: 1,
    textAlign: 'right'
  },
  date: {
    flexGrow: 2,
    textAlign: 'center'
  }
}))

export default useStyles