
import handleMovement from './movement'
import React from 'react';
import { connect } from 'react-redux'
import sprite from './evil-walking-spritesheet.png'
const spriteSize = '16px'

class Player extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      inPortal: this.props.map.inPortal
    }
  }

  render() {
    return (
      <div>
        <div
        style={{
          position: "absolute",
          top: this.props.player.position[1],
          left: this.props.player.position[0],
          backgroundImage: `url('${sprite}')`,
          backgroundPosition: this.props.player.spriteX + 'px ' + this.props.player.spriteY + 'px',
          width: spriteSize,
          height: spriteSize
        }}
        />

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

export default connect(mapStateToProps)(handleMovement(Player))
