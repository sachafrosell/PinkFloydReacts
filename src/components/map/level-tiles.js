
import React from 'react';
import { connect } from 'react-redux'


class LevelTiles extends React.Component {

  componentWillUpdate() {
    if (this.props.map.inPortal) {
      this.props.inPortal(this.props.map.inPortal, this.props.map.level)
    }
  }

  render() {
    return (
      <div>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    map: state.map
  }
}



export default connect(mapStateToProps)(LevelTiles)
