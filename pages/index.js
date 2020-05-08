import React from 'react'
import {connect} from 'react-redux'

class App extends React.Component {
  static getInitialProps({store}) {}

  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    
    return (
      <div>
        <h1>Salut</h1>
        <h2>{this.props.welcome.message}</h2>
      </div>
    )
  }
}

const mapStateToProps = state => state.mainReducer

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(App)

