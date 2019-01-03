import { connect } from 'react-redux'
import React from 'react'

class APIstore extends React.Component {

  componentWillUpdate() {
    console.log(this.props);
  }

  checkSave = () => {
    if (this.props.player.save) {
      console.log("saving");
    }
  }

  render() {
    return (
      <>
      {this.checkSave()}
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state
  }
}

export default connect(mapStateToProps)(APIstore)
